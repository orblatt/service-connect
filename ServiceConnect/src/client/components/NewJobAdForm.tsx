import { FormEvent } from 'react'
import { createJobAd } from 'wasp/client/operations'
import { Input } from '@chakra-ui/react'

  
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
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span>Description: </span>
          <Input name="description" type="text" defaultValue="" placeholder='Nanny twice a week'/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span>Price: </span>
          <Input name="price" type="number" step="0.01" min="0.01" defaultValue="0.01" />
        </div>
        <Input type="submit" value="Create Job Ad" />
      </form>
    )
  }