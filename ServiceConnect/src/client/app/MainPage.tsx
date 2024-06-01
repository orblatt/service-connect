import React from 'react';
import { AuthUser } from 'wasp/auth'


export const MainPage = ({ user }: { user: AuthUser }) => {
  return (
    <div className="container">
      <main>
        <div>
          Hello world!
        </div>
      </main>
    </div>
  );
};