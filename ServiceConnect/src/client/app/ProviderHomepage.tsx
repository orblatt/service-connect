import { Center, Card, CardBody, CardHeader, Heading, Text, Button, Box, Flex } from "@chakra-ui/react"
import { ProviderLayout } from "./MainLayout"
import { AuthUser } from "wasp/auth"
import { useUserDetails } from '../../utils'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { routes } from '../../config';
import {
    FiCompass,
  } from 'react-icons/fi'
import { TbHammer } from "react-icons/tb";

export const ProviderHomepage = ({ user }: { user: AuthUser }) => {
    const username = user.id ? useUserDetails(user.id, 'Provider').username : '';
    return (
        <ProviderLayout user={user}>
            <Card>
                <CardHeader>
                    <Heading textAlign='center'>Welcome {username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text lineHeight='taller' textAlign='center' fontSize='lg'>
                        <b>Ready to work?</b> <br/>
                    </Text>
                    <Box h='5'></Box>
                    <Center>
                    <Flex>                        
                        <ChakraLink as={ReactRouterLink} to={routes.searchJobAds} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={['md', 'lg']}
                                mr={[1,4]}
                                sx={{
                                    '@media screen and (max-width: 768px)': {
                                      transform: 'scale(0.85)', // Scale down by 70% on mobile
                                    },
                                  }}

                            >
                            <FiCompass/> &nbsp;  Browse Ads
                          </Button>
                        </ChakraLink>
                        <ChakraLink as={ReactRouterLink} to={routes.myJobs} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={['md', 'lg']}
                                mr={[1,4]}
                                sx={{
                                    '@media screen and (max-width: 768px)': {
                                      transform: 'scale(0.85)', // Scale down by 70% on mobile
                                    },
                                  }}
                            >
                              My Jobs &nbsp; <TbHammer/>
                          </Button>
                        </ChakraLink>
                    </Flex>
                    </Center>
                </CardBody>
            </Card>
        </ProviderLayout>
    )
}