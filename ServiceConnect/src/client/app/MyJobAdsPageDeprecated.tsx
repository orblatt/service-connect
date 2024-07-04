import React from 'react';
import { AuthUser } from 'wasp/auth'
import { getJobAds, useQuery } from 'wasp/client/operations'
import { JobAdsList } from '../components/JobAdsList';


export const MyJobAdsPage = ({ user }: { user: AuthUser }) => {
  const { data: jobAds, isLoading, error } = useQuery(getJobAds)

  return (
    <div>
      {jobAds && <JobAdsList jobAds={jobAds} />}
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  )
}