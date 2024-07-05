import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
    BoxProps,
    useToast
  } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiPlusCircle,
  } from 'react-icons/fi'
import { TbHammer } from "react-icons/tb";
import NavItem from './NavItem'
import { useLocation } from 'react-router-dom';

import { routes } from '../../../config'

interface LinkItemProps {
    name: string
    icon: IconType
    to: string
  }
  
  
  interface SidebarProps extends BoxProps {
    onClose: () => void
  }
  
  
  
  const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const location = useLocation();
    const toast = useToast();

    const LinkItems: Array<LinkItemProps> = [
      { name: 'Home', icon: FiHome, to: routes.home },
      { name: 'Browse', icon: FiCompass, to: routes.searchJobAds},
      { name: 'Create Ad', icon: FiPlusCircle, to: routes.createJobAd},
      { name: 'My Ads', icon: FiTrendingUp, to: routes.myJobAds },
      { name: 'My Jobs', icon: TbHammer, to: routes.myJobs },
      { name: 'Reviews', icon: FiStar, to: location.pathname },
      { name: 'Settings', icon: FiSettings, to: routes.settings},
    ]

    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold" color='purple.600'>
            Service Connect
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem 
            key={link.name} 
            icon={link.icon} 
            to={link.to} 
            onClick={
              () => { 
                if (link.name === 'Reviews') {
                  toast({
                    title: 'Coming Soon',
                    description: "We're working on it",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
                }
              }
          }
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
  }

export default SidebarContent;