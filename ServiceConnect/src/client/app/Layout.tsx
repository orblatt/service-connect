import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthUser } from 'wasp/auth'
import TopNavbar from './TopNavBar'
import './Layout.css'


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <BaseLayout>{children}</BaseLayout>
    </ChakraProvider>
  )
}

const BaseLayout: any = ({ user, children }: { user: AuthUser, children: React.ReactNode }) => {
  return (
    <div className='layout-root'>
      <TopNavbar user={user}/>
      <div className='layout-content'>
      {children}
      </div>
    </div>
  )
}

/*
<header>
  <h1>My App</h1>
</header>

<footer>
  <p>My App footer</p>
</footer>
*/