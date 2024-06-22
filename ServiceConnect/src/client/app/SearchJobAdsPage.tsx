import React, { useState } from 'react';
// import { Switch } from '@chakra-ui/react'
import { getEmail, AuthUser } from 'wasp/auth'
import { getFilteredJobAds, sendEmail, createSearchProfile, useQuery } from 'wasp/client/operations'
import { JobAdsList } from '../components/JobAdsList';
import { defaultMaxPrice, defaultMinPrice, defaultSearchProfile } from '../../config';
import { CreateSearchProfilePayload, Interval, SendEmailOptions } from '../../actions';
import { JobAdFilters } from '../../queries';
import { JobAd } from 'wasp/entities';


export const SearchJobAdsPage = ({ user }: { user: AuthUser }) => {
  // Initialize min and max price with default values
  const [minPrice, setMinPrice] = useState(parseFloat(defaultMinPrice));
  const [maxPrice, setMaxPrice] = useState(parseFloat(defaultMaxPrice));
  const [interval, setInterval] = useState(defaultSearchProfile.interval as Interval) ;
  const [isDone, setIsDone] = useState(false);
  
  const { data: jobAds, isLoading, error } = useQuery(
    getFilteredJobAds, 
    { minPrice, maxPrice, isDone } as JobAdFilters
  );

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseFloat(event.target.value) || 0);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseFloat(event.target.value) || 99999);
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(event.target.value as Interval);
  };

  const handleIsDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update 'isDone' directly with the switch's checked status
    setIsDone(!event.target.checked);
  };

  const handleSearchProfileSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const searchProfile: CreateSearchProfilePayload = { 
        minPrice, 
        maxPrice, 
        isDone, 
        interval, 
        emails: [] 
      };
      await createSearchProfile(searchProfile);
    } catch (err: any) {
      console.error('Error creating search profile:', err.message);
      window.alert('Error: ' + err.message);
    }
  }

  const handleSendEmailSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      if (jobAds) {
        const args: SendEmailOptions = { jobAds };
        await sendEmail(args);
      } else {
        const message: string = 'No job ads to send';
        console.error(message);
        window.alert(message);
      }
    } catch (err: any) {
      console.error('Error sending email:', err.message);
      window.alert('Error: ' + err.message);
    }
  }

  return (
    <div>
      <form>
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
      {/* <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='id-done-job-ads' mb='0'>Only Open Jobs?</FormLabel>
        <Switch id='id-done-job-ads' isChecked={!isDone} onChange={handleIsDoneToggle} />
      </FormControl> */}
      <label>
        Show Open Jobs? 
        <input 
            type="checkbox"
            id="isDone"
            checked={!isDone}
            onChange={handleIsDoneChange}
          />
      </label>
        <button type="button" onClick={handleSendEmailSubmit}>Send Email</button>
        <br/>

        <label>
          Choose interval:
          <select value={interval} onChange={handleIntervalChange}>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
            <option value="minutely">Minutely</option>
          </select>
        </label>
        <button type="button" onClick={handleSearchProfileSubmit}>Create Search Profile</button>
        <br/>
      </form>
      {jobAds && <JobAdsList jobAds={jobAds} />}
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  );
};