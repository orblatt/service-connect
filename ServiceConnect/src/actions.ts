import { JobAd } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { CreateJobAd, UpdateJobAd } from 'wasp/server/operations'
import { emailSender } from "wasp/server/email";
import { htmlToText } from 'html-to-text';

type CreateJobAdPayload = Pick<JobAd, 'description' | 'price'>

export const createJobAd: CreateJobAd<CreateJobAdPayload, JobAd> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.create({
    data: { 
      description: args.description,
      price: args.price,
      owner: { connect: { id: context.user.id } },
    },
  })
}

type UpdateJobAdPayload = Pick<JobAd, 'id' | 'isDone'>

export const updateJobAd: UpdateJobAd<UpdateJobAdPayload,  { count: number } > = async (
  { id, isDone }, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.updateMany({
    where: { id, owner: { id: context.user.id } },
    data: { isDone },
  })
}

export const sendEmail = async (
  args, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  const currentUserEmail = context.user.auth.identities[0].providerUserId; // TODO: change this to support second identity provider like Google OAuth
  const html = `<p>Hi <strong>${currentUserEmail}</strong></p>
                <p>Here are the job ads:</p>
                <ul>
                  ${args.jobAds.map((jobAd: JobAd) =>
                    `<li>Description: ${jobAd.description}, Price: ${jobAd.price}</li>`).join('')
                  }
                </ul>`;
  const htmlToTextOptions = { wordwrap: 130 }; // https://www.npmjs.com/package/html-to-text#options
  const info = await emailSender.send({
    from: {
      name: "John Doe",
      email: "john@example.com",
    },
    to: currentUserEmail,
    subject: `There Are ${args.jobAds.length} New Job Ads Matching Your Preferences`,
    text: htmlToText(html, htmlToTextOptions),
    html
  });
  return info;
}