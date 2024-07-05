'use client'

import React from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import MobileNav from '../components/sidebar/MobileNav'
import SidebarContent from '../components/sidebar/SidebarContent'
import { AuthUser } from 'wasp/auth';

export const MainLayout = ({ children, user }: { children: React.ReactNode, user: AuthUser } ) => {
  return (
    <ChakraProvider>
      <SidebarWithHeader user={user} role='Base'>{children}</SidebarWithHeader>
    </ChakraProvider>
  )
}

export const ProviderLayout = ({ children, user }: { children: React.ReactNode, user: AuthUser } ) => {
  return (
    <ChakraProvider>
      <SidebarWithHeader user={user} role='Provider'>{children}</SidebarWithHeader>
    </ChakraProvider>
  )
}

export const CustomerLayout = ({ children, user }: { children: React.ReactNode, user: AuthUser } ) => {
  return (
    <ChakraProvider>
      <SidebarWithHeader user={user} role='Customer'>{children}</SidebarWithHeader>
    </ChakraProvider>
  )
}

const SidebarWithHeader = ({ children, user, role }: { children: React.ReactNode, user: AuthUser, role: 'Provider' | 'Customer' | 'Base' } ) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent role={role} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent role={role} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} role={role}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
      { children }  
      </Box>
      
    </Box>
    )
}