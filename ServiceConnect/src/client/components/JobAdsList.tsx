import { JobAd } from 'wasp/entities'
import { JobAdView } from './JobAdView'

export const JobAdsList = ({ jobAds }: { jobAds: JobAd[] }) => {
    if (!jobAds?.length) return <div>No jobAds</div>
  
    return (
      <div>
        {jobAds.map((jobAd, idx) => (
          <JobAdView jobAd={jobAd} key={idx} />
        ))}
      </div>
    )
  }