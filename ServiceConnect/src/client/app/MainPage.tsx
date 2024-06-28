import React from 'react';
import { AuthUser } from 'wasp/auth'
import { Logout } from '../components/Logout';
import Layout from './Layout'


export const MainPage = ({ user }: { user: AuthUser }) => {
  return (
    <Layout>
    <div className="container">
      <main>
        <div>
          Hello world!
        </div>
        <Logout />
      </main>
    </div>
    </Layout>
  );
};