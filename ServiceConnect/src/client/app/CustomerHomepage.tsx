import { Center, Card, CardBody, CardHeader, Heading, Text, Button, Box, Flex } from "@chakra-ui/react"
import { CustomerLayout } from "./MainLayout"
import { AuthUser } from "wasp/auth"
import { useUserDetails } from '../../utils'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { routes } from '../../config';

export const CustomerHomepage = ({ user }: { user: AuthUser }) => {
    const username = user.id ? useUserDetails(user.id, 'Provider').username : '';
    return (
        <CustomerLayout user={user}>
            <Card>
                <CardHeader>
                    <Heading textAlign='center'>Welcome {username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text lineHeight='taller' textAlign='center' fontSize='lg'>
                        <b>Looking for a professional?</b> <br/>
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
                        <ChakraLink as={ReactRouterLink} to={routes.myJobAds} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'lg'}
                                mr={4}
                            >
                              My Ads
                          </Button>
                        </ChakraLink>
                    </Flex>
                    </Center>
                </CardBody>
            </Card>
        </CustomerLayout>
    )
}