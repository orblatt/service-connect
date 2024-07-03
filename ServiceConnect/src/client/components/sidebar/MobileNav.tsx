import {
  Button,
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPlus,
} from 'react-icons/fi'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { logout } from 'wasp/client/auth'
import { getEmail, AuthUser, getUsername } from 'wasp/auth'
import { routes } from '../../../config';

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, user, ...rest }: MobileProps & { user: AuthUser }) => {
    const toast = useToast();
    const email = getUsername(user);
    const username = typeof email === 'string' && email.split('@').length > 0 ? email.split('@')[0] : ''
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Logo
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <ChakraLink as={ReactRouterLink} to={routes.createJobAd} style={{ textDecoration: 'none' }}>
            <Button
                  variant={'solid'}
                  colorScheme={'purple'}
                  size={'sm'}
                  mr={4}
            >
            <FiPlus/> &nbsp; Create Ad
            </Button>
          </ChakraLink>
          {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src='https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png'
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{username}</Text>
                    <Text fontSize="xs" color="gray.600">
                      User
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <ChakraLink as={ReactRouterLink} to={routes.myJobAds} style={{ textDecoration: 'none' }}>
                  <MenuItem>
                    Profile
                  </MenuItem>
                </ChakraLink>
                <MenuItem onClick={() =>
                  toast({
                    title: 'Coming Soon',
                    description: "We're workig on it",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
                } >
                  Settings
                  </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }

  export default MobileNav;