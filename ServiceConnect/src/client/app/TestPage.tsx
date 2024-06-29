import React from 'react';
import { AuthUser } from 'wasp/auth'
import { Logout } from '../components/Logout';
import MainLayout from './MainLayout'
import Searchbar from '../components/searchbar/Searchbar';


export const TestPage = ({ user }: { user: AuthUser }) => {
  return (
    <MainLayout>
        <Searchbar/>
    </MainLayout>
  );
};