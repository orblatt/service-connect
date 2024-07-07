import { JobAd, SearchProfile } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { CreateJobAd, UpdateJobAd, UpdateJobAdProvider, SendEmail, CreateSearchProfile, DeleteSearchProfiles } from 'wasp/server/operations'
import { emailSender } from "wasp/server/email";
import { htmlToText } from 'html-to-text';
import { 
  Interval, 
  defaultCategory, 
  defaultCityPlaceholder, 
  prices, 
  duration as defaultDuration, 
  youngestChildAge as defaultYoungestChildAge,
  rooms as defaultRooms,
 } from './config';

 type RequiredProps = Pick<JobAd, 'description' | 'price' | 'category' | 'city' | 'title' | 'duration'>;
 type OptionalProps = Partial<Pick<JobAd, 'youngestChildAge' | 'toolsProvided' | 'numberOfRooms'>>;
 export type CreateJobAdPayload = RequiredProps & OptionalProps;

const validateJobAd = (args: CreateJobAdPayload): void => {
  const { description, price, category, city, title, duration, youngestChildAge, toolsProvided, numberOfRooms } = args;
  const requiredFieldsOccupied: boolean = Boolean(category && price && title && description && city && duration);
  const requiredFieldsValid: boolean = city !== defaultCityPlaceholder && 
    category !== defaultCategory && 
    price >= prices.min && 
    price <= prices.max && 
    duration >= defaultDuration.min && 
    duration <= defaultDuration.max;
  const optionalFieldsOccupied: boolean = Boolean(youngestChildAge || toolsProvided !== undefined || numberOfRooms);
  const optionalFieldsValid: boolean = (youngestChildAge >= defaultYoungestChildAge.min &&
    youngestChildAge <= defaultYoungestChildAge.max) ||
    (numberOfRooms >= defaultRooms.min &&
    numberOfRooms <= defaultRooms.max &&
    numberOfRooms % defaultRooms.step === 0) ||
    typeof toolsProvided === 'boolean';
    
  if (!requiredFieldsOccupied)
    throw new HttpError(400, 'Please fill in all required fields');
  else if (!requiredFieldsValid)
    throw new HttpError(400, 'Please fill in all required fields with valid values');
  else if (!(optionalFieldsOccupied && optionalFieldsValid))
    throw new HttpError(400, 'Please fill in any optional field with valid values');
  else 
    console.log('JobAd is valid');
    return;
}
export const createJobAd: CreateJobAd<CreateJobAdPayload, JobAd> = async ( 
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "Unauthorized access attempt.")
  }
  validateJobAd(args)
  try {
    return context.entities.JobAd.create({
      data: { 
        ...args,
        owner: { connect: { id: context.user.id } },
      },
    })
  } catch (error) {
    console.error('Error while creating JobAd:', error)
  }
}

type UpdateJobAdPayload = Pick<JobAd, 'id' | 'isDone'>

export const updateJobAd: UpdateJobAd<UpdateJobAdPayload,  { count: number } > = async (
  { id, isDone }, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "Unauthorized access attempt.")
  }
  if (!id) {
    console.error('Error while updating JobAd provider: id is missing')
    return;
  }
  try {
    return context.entities.JobAd.updateMany({
      where: { id, owner: { id: context.user.id } },
      data: { isDone },
    })
  } catch (error) {
    console.error('Error while updating JobAd:', error)
  }
}

export const updateJobAdProvider: UpdateJobAdProvider<Pick<JobAd, 'id'>,  JobAd> = async (
  { id }, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "Unauthorized access attempt.")
  }
  if (!id) {
    console.error('Error while updating JobAd provider: id is missing')
    return;
  }
  let jobAd: JobAd | null;
  try {
    jobAd = await context.entities.JobAd.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error while updating JobAd provider:', error)
    return;
  }
  const currentUserId = context.user.id;
  if (!jobAd) {
    throw new HttpError(404, 'JobAd not found');
  } else if (jobAd.ownerId === currentUserId) {
    throw new HttpError(403, 'You are the owner of this ad, you cannot be the provider as well.');
  } else if (jobAd.providerId === currentUserId) {  // Disconnect 
    return context.entities.JobAd.update({
      where: { id },
      data: { 
        provider: {
          disconnect: true,
        } ,
      },
    });
  } else { // Connect
    return context.entities.JobAd.update({
      where: { id },
      data: { 
        provider: { 
          connect: { id: currentUserId } 
        } 
      },
    });
  };
};

export type SendEmailOptions = { 
  jobAds: JobAd[], 
  email?: string 
}

export const sendEmail: SendEmail<SendEmailOptions , any>  = async (
  args, 
  context
) => {
  const { jobAds, email: inputEmail } = args;
  const currentUserEmail: string | undefined = context?.user?.auth?.identities[0]?.providerUserId ?? undefined; // TODO: change this to support second identity provider like Google OAuth
  const email = inputEmail ? inputEmail : currentUserEmail;
  if (!email) {
    throw new HttpError(500, 'Could not parse user\'s email correctly');
  }
  const subject: string = `There are ${jobAds.length} new job ads matching your preferences`
  const html: string = `
                       <p>Hi <strong>${email}</strong></p>
                       <h2>${subject}</h2>
                       <ul>
                         ${jobAds.map((jobAd: JobAd) =>
                           `<li>
                             Description: ${jobAd.description},
                             Price: ${jobAd.price}, 
                             Done: ${ jobAd.isDone ? 'Yes' : 'No'}
                           </li>`)
                           .join('')
                         }
                       </ul>`;
  const htmlToTextOptions: object = { wordwrap: 130 }; // https://www.npmjs.com/package/html-to-text#options
  const info = await emailSender.send({
    to: email,
    subject: `There are ${jobAds.length} new job ads matching your preferences`,
    text: htmlToText(html, htmlToTextOptions),
    html
  });
  return info;
};

export type CreateSearchProfilePayload = Pick<
  SearchProfile, 'minPrice' | 'maxPrice' | 'isDone' | 'category' | 'city' | 'minDuration' | 'maxDuration' | 'exactDuration'
> & { interval: Interval | 'Interval', emails: string[], isDurationExact: boolean};

export const createSearchProfile: CreateSearchProfile<CreateSearchProfilePayload, SearchProfile> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "Unauthorized access attempt.")
  }
  const { emails: inputEmails, minPrice, maxPrice, category, isDone, interval, city, minDuration, maxDuration, exactDuration, isDurationExact } = args;
  if (!interval || interval === 'Interval') {
    throw new HttpError(400, 'Interval is missing');
  }
  const currentUserEmail: string = context.user.auth.identities[0].providerUserId; // TODO: change this to support second identity provider like Google OAuth
  const emails: string[] = inputEmails === undefined || inputEmails.length == 0 ? [ currentUserEmail ] : inputEmails;

  const data: any = {
    emails,
    minPrice,
    maxPrice,
    isDone,
    interval,
    searcher: { connect: { id: context.user.id } },
  };
  if (category && category !== defaultCategory) {
    data.category = category;
  }
  if (city && city !== defaultCityPlaceholder && city !== 'Any city') {
    data.city = city;
  }
  if (isDurationExact) {
    data.exactDuration = exactDuration;
  } else {
    data.minDuration = minDuration;
    data.maxDuration = maxDuration;
  }

  return context.entities.SearchProfile.create({ data });
};

export const deleteSearchProfiles:any = async ( 
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "Unauthorized access attempt.")
  }
  try {
    return context.entities.SearchProfile.deleteMany({
      where: { searcher: { id: context.user.id } },
    })
  } catch (error) {
    console.error('Error while deleting Search Profiles:', error)
  }
}