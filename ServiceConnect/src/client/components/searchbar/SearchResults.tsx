import { SimpleGrid } from '@chakra-ui/react'
import SearchResult from './SearchResult'
import { JobAd } from 'wasp/entities';
import { AuthUser } from 'wasp/auth';

const SearchResults = ({ jobAds, user }: { jobAds: JobAd[], user: AuthUser }) => {
    const searchResults: React.ReactElement<typeof SearchResult>[] = jobAds.map((jobAd: JobAd, index) => {
        return <SearchResult key={index} jobAd={jobAd} isPreview={false} user={user}/>
    });
    return (
        <SimpleGrid minChildWidth='250px' spacing='20px'>
            { ...searchResults }
        </SimpleGrid>
    )
}

export default SearchResults;