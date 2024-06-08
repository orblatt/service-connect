import { FormEvent } from 'react'
import { sendEmail } from 'wasp/client/operations'
import { defaultMinPrice, defaultMaxPrice } from '../../config'
  
export const SendEmailForm = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const target = event.target as HTMLFormElement
        const minPrice = target.minPrice.value
        const maxPrice = target.maxPrice.value
        const args = { minPrice, maxPrice }
        target.reset()
        await sendEmail(args)
      } catch (err: any) {
        window.alert('Error: ' + err.message)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        Min Price:<input name="minPrice" type="number" step="0.01" min={defaultMinPrice} defaultValue="1" /><br />
        Max Price:<input name="maxPrice" type="number" step="0.01" max={defaultMaxPrice} defaultValue="100" /><br />
        <input type="submit" value="Send Email" />
      </form>
    )
  }