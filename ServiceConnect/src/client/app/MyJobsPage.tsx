import { AuthUser } from "wasp/auth"
import { ProviderLayout } from "./MainLayout"
import SearchResults from '../components/searchbar/SearchResults';
import { getMyJobs, useQuery } from 'wasp/client/operations'
import { JobAd } from "wasp/entities";
import { Card, CardHeader, Heading, Box } from "@chakra-ui/react";


export const MyJobsPage = ({ user }: { user: AuthUser }) => {
    const { data: jobAds, isLoading, error } = useQuery(getMyJobs)

    return (
        <ProviderLayout user={user}>
            <Card shadow='lg' variant='elevated'>
                <CardHeader>
                    <Heading>My Jobs</Heading>
                </CardHeader>
            </Card>
            <Box h={3}></Box>
            {jobAds && <SearchResults jobAds={jobAds as JobAd[]} user={user}/>}
            {/* {isLoading && 'Loading...'} */}
            {error && 'Error: ' + error}
        </ProviderLayout>
    )
}