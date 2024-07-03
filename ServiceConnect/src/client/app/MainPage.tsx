import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react"
import MainLayout from "./MainLayout"
import { AuthUser } from "wasp/auth"
import { useUserDetails } from '../../utils'

export const MainPage = ({ user }: { user: AuthUser }) => {
    const username = user.id ? useUserDetails(user.id, 'Owner') : '';
    return (
        <MainLayout user={user}>
            <Card>
                <CardHeader>
                    <Heading>Welcome {username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text lineHeight='taller'>
                        Welcome to Service Connect! This is a platform that connects service providers with customers.<br/>
                        As a service provider, you can create job ads and get hired by customers.<br/>
                        As a customer, you can browse job ads and hire service providers.<br/>
                        <b>Are you ready?</b>
                    </Text>
                    <Text>

                    </Text>
                </CardBody>
            </Card>
        </MainLayout>
    )
}