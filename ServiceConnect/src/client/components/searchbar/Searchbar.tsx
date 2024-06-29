import { Stack, Card, CardHeader, CardBody, Heading, Flex } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import JobCategoriesDropdown from './JobCategoriesDropdown';
import PriceSlider from './PriceSlider';

const Searchbar = () => {
    return (
        <Stack spacing='4'>
            <Card key='lg' size='lg' variant='elevated'>
            <CardHeader>
                <Heading size='md'><Flex> Search &nbsp; <FiSearch/></Flex></Heading>
            </CardHeader>
            <CardBody>
                <JobCategoriesDropdown />
                <PriceSlider/>
            </CardBody>
            </Card>
        </Stack>
    );
}

export default Searchbar;