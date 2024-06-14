import { JobAd } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { CreateJobAd, UpdateJobAd } from 'wasp/server/operations'
import { emailSender } from "wasp/server/email";
import { htmlToText } from 'html-to-text';

export type CreateJobAdPayload = Pick<JobAd, 'description' | 'price' >

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
  const currentUserEmail: string = context.user.auth.identities[0].providerUserId; // TODO: change this to support second identity provider like Google OAuth
  const subject: string = `There Are ${args.jobAds.length} New Job Ads Matching Your Preferences`
  const html: string = `
                       <p>Hi <strong>${currentUserEmail}</strong></p>
                       <h2>${subject}</h2>
                       <ul>
                         ${args.jobAds.map((jobAd: JobAd) =>
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
    to: currentUserEmail,
    subject: `There Are ${args.jobAds.length} New Job Ads Matching Your Preferences`,
    text: htmlToText(html, htmlToTextOptions),
    html
  });
  return info;
}