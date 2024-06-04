import { JobAd } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type GetJobAds, type GetFilteredJobAds } from 'wasp/server/operations'
import { defaultMaxPrice, defaultMinPrice } from './config'

export const getJobAds: GetJobAds<void, JobAd[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.findMany({
    where: { owner: { id: context.user.id } },
    orderBy: { id: 'asc' },
  })
}


type jobAdFilters = { minPrice?: number | string, maxPrice?: number | string }

export const getFilteredJobAds: GetFilteredJobAds<
  jobAdFilters,
  JobAd[]
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  const minPrice: number = typeof args.minPrice === 'number' 
                           ? args.minPrice 
                           : parseFloat(args.minPrice || defaultMinPrice);
  const maxPrice: number = typeof args.maxPrice === 'number' 
                           ? args.maxPrice 
                           : parseFloat(args.maxPrice || defaultMaxPrice);
  const jobAds: Promise<JobAd[]> = context.entities.JobAd.findMany({
      where: { 
        owner: { id: context.user.id },
        AND: [
          { price: { gte: minPrice } },  // gte means 'greater than or equal to
          { price: { lte: maxPrice } },  // lte means 'less than or equal to
        ]
      },
      orderBy: { id: 'asc' },
    });
  return jobAds;
};