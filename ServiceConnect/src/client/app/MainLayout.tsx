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

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </ChakraProvider>
  )
}

const SidebarWithHeader = ({ children }: { children: React.ReactNode } ) => {
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      { children }  
      </Box>
      
    </Box>
    )
}

export default MainLayout;