import { JobAd } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type GetJobAds } from 'wasp/server/operations'

export const getJobAds: GetJobAds<void, JobAd[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: 'asc' },
  })
}