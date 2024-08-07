import { Center, Card, CardBody, CardHeader, Heading, Text, Button, Box, Flex } from "@chakra-ui/react"
import { MainLayout } from "./MainLayout"
import { AuthUser } from "wasp/auth"
import { useUserDetails } from '../../utils'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { routes } from '../../config';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export const MainPage = ({ user }: { user: AuthUser }) => {
    const username = user.id ? useUserDetails(user.id, 'Owner').username : '';
    return (
        <MainLayout user={user}>
            <Card>
                <CardHeader>
                    <Heading textAlign='center'>Welcome {username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text lineHeight='taller' textAlign='center' fontSize='lg'>
                        Enter the provider tab to earn money<br/>
                        Enter the customer tab to hire providers
                    </Text>
                    <Box h='5'></Box>
                    <Center>
                    <Flex>
                        
                        <ChakraLink as={ReactRouterLink} to={routes.customerHome} style={{ textDecoration: 'none' }}>
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
                            <FaArrowLeft/> &nbsp; Customer Tab
                            </Button>
                        </ChakraLink>
                        
                        <ChakraLink as={ReactRouterLink} to={routes.providerHome} style={{ textDecoration: 'none' }}>
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
                             Provider Tab &nbsp; <FaArrowRight/>
                          </Button>
                        </ChakraLink>
                    </Flex>
                    </Center>
                </CardBody>
            </Card>
        </MainLayout>
    )
}