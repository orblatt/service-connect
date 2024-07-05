import React from 'react';
import { AuthUser } from 'wasp/auth'
import { CustomerLayout } from './MainLayout'
import CreateJobAdForm from '../components/createJobAd/Form';


export const CreateJobAdPage = ({ user }: { user: AuthUser }) => {
  return (
    <CustomerLayout user={user}>
        <CreateJobAdForm user={user}/>
    </CustomerLayout>
  );
};