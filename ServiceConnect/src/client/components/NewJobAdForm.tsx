import { FormEvent } from 'react'
import { createJobAd } from 'wasp/client/operations'

  
export const NewJobAdForm = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const target = event.target as HTMLFormElement
        const description = target.description.value
        target.reset()
        await createJobAd({ description })
      } catch (err: any) {
        window.alert('Error: ' + err.message)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="description" type="text" defaultValue="" />
        <input type="submit" value="Create Job Ad" />
      </form>
    )
  }