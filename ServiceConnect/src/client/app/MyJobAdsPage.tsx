import { AuthUser } from "wasp/auth"
import { CustomerLayout } from "./MainLayout"
import SearchResults from '../components/searchbar/SearchResults';
import { getJobAds, useQuery } from 'wasp/client/operations'
import { JobAd } from "wasp/entities";
import { Card, CardHeader, Heading, Box } from "@chakra-ui/react";


export const MyJobAdsPage = ({ user }: { user: AuthUser }) => {
    const { data: jobAds, isLoading, error } = useQuery(getJobAds)

    return (
        <CustomerLayout user={user}>
            <Card shadow='lg' variant='elevated'>
                <CardHeader>
                    <Heading>My Ads</Heading>
                </CardHeader>
            </Card>
            <Box h={3}></Box>
            {jobAds && <SearchResults jobAds={jobAds as JobAd[]} user={user}/>}
            {/* {isLoading && 'Loading...'} */}
            {error && 'Error: ' + error}
        </CustomerLayout>
    )
}