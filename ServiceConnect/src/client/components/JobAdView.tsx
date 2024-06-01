import { JobAd } from 'wasp/entities'

export const JobAdView = ({ jobAd }: { jobAd: JobAd }) => {
    return (
      <div>
        <input type="checkbox" id={String(jobAd.id)} checked={jobAd.isDone} />
        {jobAd.description}
      </div>
    )
  }