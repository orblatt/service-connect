import { FormEvent } from 'react'
import { createJobAd } from 'wasp/client/operations'

  
export const NewJobAdForm = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const target = event.target as HTMLFormElement
        const description = target.description.value
        const price = parseFloat(target.price.value)
        target.reset()
        await createJobAd({ description, price })
      } catch (err: any) {
        window.alert('Error: ' + err.message)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="description" type="text" defaultValue="" />Description <br />
        <input name="price" type="number" step="0.01" min="0" defaultValue="0.00" />Price <br />
        <input type="submit" value="Create Job Ad" />
      </form>
    )
  }