import { JobAd, SearchProfile } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type GetJobAds, type GetFilteredJobAds, type GetFilteredSearchProfiles } from 'wasp/server/operations'
import { defaultCategory, defaultCityPlaceholder, defaultIntervals, defaultMaxPrice, defaultMinPrice } from './config'
import { type Interval } from './config'

export const getJobAds: GetJobAds<void, JobAd[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.findMany({
    where: { owner: { id: context.user.id } },
    orderBy: { id: 'asc' },
  })
}

export type JobAdFilters = { 
  minPrice?: number | string, 
  maxPrice?: number | string, 
  isDone?: boolean, 
  interval?: Interval,
  category?: string,
  city?: string,
}

export const getFilteredJobAds: GetFilteredJobAds<
  JobAdFilters,
  JobAd[]
> = async (args: JobAdFilters, context: any) => {
  let { minPrice, maxPrice, isDone, interval, category, city } = args
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
  if (interval !== undefined) {  
    whereCondition.AND.push({ interval });
  }
  if (isDone !== undefined) {
    whereCondition.AND.push({ isDone });
  }
  if (category !== defaultCategory) {
    whereCondition.AND.push({ category });
  }
  if (city !== defaultCityPlaceholder)  {
    whereCondition.AND.push({ city });
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
    whereCondition = { interval: { in: defaultIntervals } }
  } else {
    whereCondition = { interval }
  }
  return context.entities.SearchProfile.findMany({
    where: whereCondition,
    orderBy: { id: 'asc' },
  })
}