import { JobAd, SearchProfile, User } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type GetJobAds, type GetFilteredJobAds, type GetFilteredSearchProfiles, type GetUserById, type GetMyJobs } from 'wasp/server/operations'
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
  interval?: Interval | 'Interval',
  category?: string,
  city?: string,
  minDuration?: number,
  maxDuration?: number,
  exactDuration?: number,
}

export const getFilteredJobAds: GetFilteredJobAds<
  JobAdFilters,
  JobAd[]
> = async (args: JobAdFilters, context: any) => {
  let { minPrice, maxPrice, isDone, interval, category, city, minDuration, maxDuration, exactDuration } = args
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
  if (interval && interval !== 'Interval') {  
    whereCondition.AND.push({ interval });
  }
  if (isDone !== undefined && typeof isDone === 'boolean') {
    whereCondition.AND.push({ isDone });
  }
  if (category && category !== defaultCategory) {
    whereCondition.AND.push({ category });
  }
  if (city && city !== defaultCityPlaceholder)  {
    whereCondition.AND.push({ city });
  }
  if (exactDuration) {
    whereCondition.AND.push({ duration: exactDuration });
  } else if (minDuration && maxDuration) {
    whereCondition.AND.push({ duration: { gte: minDuration } });
    whereCondition.AND.push({ duration: { lte: maxDuration } });
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
  } else if (interval === 'Interval') {
    throw new HttpError(400, 'Invalid interval')
  } else {
    whereCondition = { interval }
  }
  return context.entities.SearchProfile.findMany({
    where: whereCondition,
    orderBy: { id: 'asc' },
  })
}

export const getUserById: GetUserById<{ userId: number }, User> = async (args: { userId: number }, context: any) => {
  if (!args.userId) {
    return null
  }
  return context.entities.User.findUnique({
    where: {
      id: args.userId
    },
    include: {
      auth: {
        include: {
          identities: true
        }
      }
    }
  })
}

export const getMyJobs: GetMyJobs<void, JobAd[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.findMany({
    where: { provider: { id: context.user.id } },
    orderBy: { id: 'asc' },
  })
}