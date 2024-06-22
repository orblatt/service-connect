import { JobAd, SearchProfile } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type GetJobAds, type GetFilteredJobAds, type GetFilteredSearchProfiles } from 'wasp/server/operations'
import { defaultMaxPrice, defaultMinPrice } from './config'
import { Interval } from './actions'

export const getJobAds: GetJobAds<void, JobAd[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.findMany({
    where: { owner: { id: context.user.id } },
    orderBy: { id: 'asc' },
  })
}


export type JobAdFilters = { minPrice?: number | string, maxPrice?: number | string, isDone?: boolean, interval?: Interval }

export const getFilteredJobAds: GetFilteredJobAds<
  JobAdFilters,
  JobAd[]
> = async (args: JobAdFilters, context: any) => {
  let { minPrice, maxPrice, isDone, interval } = args
  minPrice = typeof minPrice === 'number' 
             ? minPrice 
             : parseFloat(minPrice || defaultMinPrice);
  maxPrice = typeof maxPrice === 'number' 
             ? maxPrice 
             : parseFloat(maxPrice || defaultMaxPrice);
  let whereCondition: any = {
    AND: [
      { price: { gte: minPrice } },  // gte means 'greater than or equal to
      { price: { lte: maxPrice } },  // lte means 'less than or equal to
    ]
  };
  if (interval !== undefined) {  // TODO: support fetching job ads deltas for different intervals using dynamic where condition on createdAt property
    whereCondition.AND.push({ interval });
  }
  if (isDone !== undefined) {
    whereCondition.AND.push({ isDone });
  }
  const jobAds: Promise<JobAd[]> = context.entities.JobAd.findMany({
      where: whereCondition,
      orderBy: { id: 'asc' },
    });
  return jobAds;
};


export const getFilteredSearchProfiles: GetFilteredSearchProfiles<
Pick<JobAdFilters, 'interval'>, 
SearchProfile[]
> = async (args: Pick<JobAdFilters, 'interval'>, context: any) => {
  const { interval } = args
  let whereCondition: any;
  if (!interval) {
    whereCondition = { interval: { in: ['weekly', 'daily', 'hourly', 'minutely'] } }
  } else {
    whereCondition = { interval }
  }
  return context.entities.SearchProfile.findMany({
    where: whereCondition,
    orderBy: { id: 'asc' },
  })
}