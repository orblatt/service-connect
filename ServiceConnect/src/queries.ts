import { JobAd } from 'wasp/entities'
import { type GetJobAds } from 'wasp/server/operations'

export const getJobAds: GetJobAds<void, JobAd[]> = async (args, context) => {
  return context.entities.JobAd.findMany({
    orderBy: { id: 'asc' },
  })
}