import React from 'react';

import {
  getJobAds,
  useQuery
} from 'wasp/client/operations'
import { JobAdsList } from '../components/JobAdsList';
import { NewJobAdForm } from '../components/NewJobAdForm';


export const CreateJobAdPage: React.FC = () => {
    const { data: jobAds, isLoading, error } = useQuery(getJobAds)
  
    return (
      <div>
        <NewJobAdForm />
  
        {jobAds && <JobAdsList jobAds={jobAds} />}
        {isLoading && 'Loading...'}
        {error && 'Error: ' + error}
      </div>
    )
  }