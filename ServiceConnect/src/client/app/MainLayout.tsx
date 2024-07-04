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

const MainLayout = ({ children, user }: { children: React.ReactNode, user: AuthUser } ) => {
  return (
    <ChakraProvider>
      <SidebarWithHeader user={user}>{children}</SidebarWithHeader>
    </ChakraProvider>
  )
}

const SidebarWithHeader = ({ children, user }: { children: React.ReactNode, user: AuthUser } ) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      { children }  
      </Box>
      
    </Box>
    )
}

export default MainLayout;