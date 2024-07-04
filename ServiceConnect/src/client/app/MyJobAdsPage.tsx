import { AuthUser } from "wasp/auth"
import MainLayout from "./MainLayout"
import SearchResults from '../components/searchbar/SearchResults';
import { getJobAds, useQuery } from 'wasp/client/operations'
import { JobAd } from "wasp/entities";
import { Card, CardHeader, Heading, Box } from "@chakra-ui/react";


export const MyJobAdsPage = ({ user }: { user: AuthUser }) => {
    const { data: jobAds, isLoading, error } = useQuery(getJobAds)

    return (
        <MainLayout user={user}>
            <Card shadow='lg' variant='elevated'>
                <CardHeader>
                    <Heading>My Job Ads</Heading>
                </CardHeader>
            </Card>
            <Box h={3}></Box>
            {jobAds && <SearchResults jobAds={jobAds as JobAd[]}/>}
            {isLoading && 'Loading...'}
            {error && 'Error: ' + error}
        </MainLayout>
    )
}