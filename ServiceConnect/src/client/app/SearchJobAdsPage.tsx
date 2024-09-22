import React from 'react';
import { AuthUser } from 'wasp/auth'
import { ProviderLayout } from './MainLayout'
import Searchbar from '../components/searchbar/Searchbar';


export const SearchJobAdsPage = ({ user }: { user: AuthUser }) => {
  return (
    <ProviderLayout user={user}>
        <Searchbar user={user}/>
    </ProviderLayout>
  );
};