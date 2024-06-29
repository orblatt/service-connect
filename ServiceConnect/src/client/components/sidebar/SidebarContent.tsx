import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
    BoxProps
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
import NavItem from './NavItem'
import { routes } from '../../../config'

interface LinkItemProps {
    name: string
    icon: IconType
    to: string
  }
  
  
  interface SidebarProps extends BoxProps {
    onClose: () => void
  }
  
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, to: routes.home },
    { name: 'Create Ad', icon: FiPlusCircle, to: routes.createJobAd},
    { name: 'Explore', icon: FiCompass, to: routes.searchJobAds},
    { name: 'Reports', icon: FiTrendingUp, to: routes.myJobAds },
    { name: 'Reviews', icon: FiStar, to: routes.test },
    { name: 'Settings', icon: FiSettings, to: routes.test},
  ]
  
  const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Service Connect
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
  }

export default SidebarContent;