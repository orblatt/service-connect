
import { ChangeEvent } from 'react'
import { JobAd } from 'wasp/entities'
import { updateJobAd, updateJobAdProvider } from 'wasp/client/operations'

export const JobAdView = ({ jobAd }: { jobAd: JobAd }) => {
    const handleIsDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        await updateJobAd({
          id: jobAd.id,
          isDone: event.target.checked,
        })
      } catch (error: any) {
        window.alert('Error while updating job Ad status: ' + error.message)
      }
    }

    const handleProviderChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      try {
        await updateJobAdProvider({ id: jobAd.id })
      } catch (error: any) {
        window.alert('Error while updating job ad provider: ' + error.message)
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
        Description: {jobAd.description}, Price: {jobAd.price}, Status: {jobAd.isDone ? 'Done' : 'Open'}, Provider: {jobAd.providerId ? jobAd.providerId : 'No Provider'} 
        <button type="button" onClick={handleProviderChange}>Assign Me</button>
      </div>
    )
  }