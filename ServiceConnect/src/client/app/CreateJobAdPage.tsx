import React from 'react';

import {
  getJobAds,
  useQuery
} from 'wasp/client/operations'
import { AuthUser } from 'wasp/auth'
import { JobAdsList } from '../components/JobAdsList';
import { NewJobAdForm } from '../components/NewJobAdForm';
import MainLayout from './Layout';

export const CreateJobAdPage = ({ user }: { user: AuthUser }) => {
    const { data: jobAds, isLoading, error } = useQuery(getJobAds)
  
    return (
      <MainLayout>
        <div>
          <NewJobAdForm />
    
          {jobAds && <JobAdsList jobAds={jobAds} />}
          {isLoading && 'Loading...'}
          {error && 'Error: ' + error}
        </div>
      </MainLayout>

    );
  };