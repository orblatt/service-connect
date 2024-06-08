import React, { useState, FormEvent } from 'react';
import { AuthUser } from 'wasp/auth'
import { getFilteredJobAds, sendEmail, useQuery } from 'wasp/client/operations'
import { JobAdsList } from '../components/JobAdsList';
import { defaultMaxPrice, defaultMinPrice } from '../../config';


export const SearchJobAdsPage = ({ user }: { user: AuthUser }) => {
  // Initialize min and max price with default values
  const [minPrice, setMinPrice] = useState(parseFloat(defaultMinPrice));
  const [maxPrice, setMaxPrice] = useState(parseFloat(defaultMaxPrice));
  // const { data: jobAds, isLoading, error } = useQuery(
  //     ['getFilteredJobAds', { minPrice, maxPrice }],
  //     () => getFilteredJobAds({ minPrice, maxPrice }),
  //     { keepPreviousData: true}
  //   )
  const { data: jobAds, isLoading, error } = useQuery(
    getFilteredJobAds, { minPrice, maxPrice }
  )

  const handleMinPriceChange = (event) => {
    setMinPrice(parseFloat(event.target.value) || 0);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseFloat(event.target.value) || 99999);
  };

  const handleSendEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget;

    try {
      if (jobAds) {
        await sendEmail({ jobAds });
      } else {
        const message: string = 'No job ads to send';
        console.error(message);
        window.alert(message);
      }
    } catch (err: any) {
      console.error('Error sending email:', err.message);
      window.alert('Error: ' + err.message);
    } finally {
      form.reset();
    }
  }

  return (
    <div>
      <form onSubmit={handleSendEmailSubmit}>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
            min={defaultMinPrice}
            step="0.01"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            max={defaultMaxPrice}
            step="0.01"
          />
        </label>
        <input type="submit" value="Send Email" />

      </form>
      {jobAds && <JobAdsList jobAds={jobAds} />}
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  );
};