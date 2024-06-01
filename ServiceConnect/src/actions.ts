import { JobAd } from 'wasp/entities'
import { CreateJobAd } from 'wasp/server/operations'

type CreateJobAdPayload = Pick<JobAd, 'description'>

export const createJobAd: CreateJobAd<CreateJobAdPayload, JobAd> = async (
  args,
  context
) => {
  return context.entities.JobAd.create({
    data: { description: args.description },
  })
}