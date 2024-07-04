import React from 'react';
import { AuthUser } from 'wasp/auth'
import MainLayout from './MainLayout'
import Searchbar from '../components/searchbar/Searchbar';
import { Box } from '@chakra-ui/react';


export const SearchJobAdsPage = ({ user }: { user: AuthUser }) => {
  return (
    <MainLayout user={user}>
        <Searchbar user={user}/>
    </MainLayout>
  );
};