import React from 'react';
import { AuthUser } from 'wasp/auth'
import { Logout } from '../components/Logout';


export const MainPage = ({ user }: { user: AuthUser }) => {
  return (
    <div className="container">
      <main>
        <div>
          Hello world!
        </div>
        <Logout />
      </main>
    </div>
  );
};