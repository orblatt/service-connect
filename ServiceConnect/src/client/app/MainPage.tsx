import React from 'react';
import { AuthUser } from 'wasp/auth'
import { Logout } from '../components/Logout';
import MainLayout from './Layout'


export const MainPage = ({ user }: { user: AuthUser }) => {
  return (
    <MainLayout>
    <div className="container">
      <main>
        <div>
          Hello world!
        </div>
        <Logout />
      </main>
    </div>
    </MainLayout>
  );
};