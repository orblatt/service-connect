import { SimpleGrid } from '@chakra-ui/react'
import SearchResult from './SearchResult'
import { JobAd } from 'wasp/entities';

const SearchResults = ({ jobAds }: { jobAds: JobAd[] }) => {
    const searchResults: React.ReactElement<typeof SearchResult>[] = jobAds.map((jobAd: JobAd, index) => {
        return <SearchResult key={index} jobAd={jobAd} isPreview={false}/>
    });
    return (
        <SimpleGrid minChildWidth='250px' spacing='20px'>
            { ...searchResults }
        </SimpleGrid>
    )
}

export default SearchResults;