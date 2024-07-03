import { Center, Card, CardBody, CardHeader, Heading, Text, Button, Box, Flex } from "@chakra-ui/react"
import MainLayout from "./MainLayout"
import { AuthUser } from "wasp/auth"
import { useUserDetails } from '../../utils'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { routes } from '../../config';
import {
    FiPlus,
  } from 'react-icons/fi'

export const MainPage = ({ user }: { user: AuthUser }) => {
    const username = user.id ? useUserDetails(user.id, 'Owner') : '';
    return (
        <MainLayout user={user}>
            <Card>
                <CardHeader>
                    <Heading textAlign='center'>Welcome {username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text lineHeight='taller' textAlign='center' fontSize='lg'>
                        Welcome to Service Connect! This is a platform that connects service providers with customers.<br/>
                        As a service provider, you can create job ads and get hired by customers.<br/>
                        As a customer, you can browse job ads and hire service providers.<br/>
                        <b>Are you ready?</b>
                    </Text>
                    <Box h='5'></Box>
                    <Center>
                    <Flex>
                        
                        <ChakraLink as={ReactRouterLink} to={routes.createJobAd} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'lg'}
                                mr={4}
                            >
                                Create Ad
                            </Button>
                        </ChakraLink>
                        
                        <ChakraLink as={ReactRouterLink} to={routes.searchJobAds} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'lg'}
                                mr={4}
                            >
                              Browse Ads
                          </Button>
                        </ChakraLink>
                    </Flex>
                    </Center>
                </CardBody>
            </Card>
        </MainLayout>
    )
}