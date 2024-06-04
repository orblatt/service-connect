import React, { useState } from 'react';
import { AuthUser } from 'wasp/auth'
import { getFilteredJobAds, useQuery } from 'wasp/client/operations'
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
  return (
    <div>
      <form>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            max="99999"
            step="0.01"
          />
        </label>
      </form>
      {jobAds && <JobAdsList jobAds={jobAds} />}
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  );
};