import React from 'react';
import { AuthUser } from 'wasp/auth'
import MainLayout from './MainLayout'
import CreateJobAdForm from '../components/createJobAd/Form';


export const CreateJobAdPage = ({ user }: { user: AuthUser }) => {
  return (
    <MainLayout user={user}>
        <CreateJobAdForm/>
    </MainLayout>
  );
};