import React from 'react';
import { getJobAds, useQuery } from 'wasp/client/operations'
// import { JobAdsList } from '../components/JobAdsList';
import { JobAd } from 'wasp/entities'


export const SearchJobAdsPage: React.FC = () => {
  const { data: jobAds, isLoading, error } = useQuery(getJobAds)

  return (
    <div>
      {jobAds && <JobAdsList jobAds={jobAds} />}
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  )
}

const JobAdView = ({ jobAd }: { jobAd: JobAd }) => {
    return (
      <div>
        <input type="checkbox" id={String(jobAd.id)} checked={jobAd.isDone} />
        {jobAd.description}
      </div>
    )
  }

const JobAdsList = ({ jobAds }: { jobAds: JobAd[] }) => {
    if (!jobAds?.length) return <div>No jobAds</div>
  
    return (
      <div>
        {jobAds.map((jobAd, idx) => (
          <JobAdView jobAd={jobAd} key={idx} />
        ))}
      </div>
    )
  }