
import { ChangeEvent } from 'react'
import { JobAd } from 'wasp/entities'
import { updateJobAd } from 'wasp/client/operations'

export const JobAdView = ({ jobAd }: { jobAd: JobAd }) => {
    const handleIsDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        await updateJobAd({
          id: jobAd.id,
          isDone: event.target.checked,
        })
      } catch (error: any) {
        window.alert('Error while updating task: ' + error.message)
      }
    }

    return (
      <div>
        <input 
          type="checkbox"
          id={String(jobAd.id)}
          checked={jobAd.isDone} 
          onChange={handleIsDoneChange}
        />
        {jobAd.description}
      </div>
    )
  }