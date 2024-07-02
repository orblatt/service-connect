import React, { useState } from 'react';
import { Box, Stack, Card, CardHeader, CardBody, Heading, Flex, MenuItem } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import JobCategoriesDropdown from './JobCategoriesDropdown';
import IsDoneSwitch from './IsDoneSwitch';
import { PriceRangeSlider, PriceProps } from './PriceRangeSlider';
import { jobCategories, prices } from '../../../config';
import SearchResults from './SearchResults';
import { JobAdFilters } from '../../../queries';
import { JobAd } from 'wasp/entities';
import { useQuery, getFilteredJobAds } from 'wasp/client/operations'


const Searchbar = () => {
    const { defaultMinPrice, defaultMaxPrice } = prices;
    const [minPrice, setMinPrice] = useState<PriceProps>({valueAsString: defaultMinPrice.toString(), valueAsNumber: defaultMinPrice});
    const [maxPrice, setMaxPrice] = useState<PriceProps>({valueAsString: defaultMaxPrice.toString(), valueAsNumber: defaultMaxPrice});
    const [isDone, setIsDone] = useState(false);
    const [menuButtonLabel, setMenuButtonLabel] = useState('Category');
    const menuItems: React.ReactElement<typeof MenuItem>[] = jobCategories.map(
        (category: string, index) => {
            return <MenuItem 
                    key={index} 
                    onClick={() => setMenuButtonLabel(category)}>
                    {category}
                </MenuItem>
        }
    );
    const { data: jobAds, isLoading, error } = useQuery(
        getFilteredJobAds, 
        { minPrice: minPrice.valueAsNumber, maxPrice: maxPrice.valueAsNumber, isDone, category: menuButtonLabel } as JobAdFilters
      );


    const handleMinChange = (valueAsString: string, valueAsNumber: number) => {
        const newMin = valueAsNumber;
        if (newMin <= maxPrice.valueAsNumber) { // Ensuring new min is not greater than current max
            setMinPrice({ valueAsString, valueAsNumber});
        }
    };

    const handleMaxChange = (valueAsString: string, valueAsNumber: number) => {
        const newMax = valueAsNumber;
        if (newMax >= minPrice.valueAsNumber) { // Ensuring new min is not greater than current max
            setMaxPrice({ valueAsString, valueAsNumber});
        }
     };

    const handleIsDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsDone(!event.target.checked);
    };

    return (
        <Box>
            <Stack>
                <Card key='md' size='md' variant='elevated'>
                <CardHeader mb={0}>
                    <Heading size='md'><Flex> Search &nbsp; <FiSearch/></Flex></Heading>
                </CardHeader>
                <CardBody mt={0}>
                    <Flex>
                        <JobCategoriesDropdown menuButtonLabel={menuButtonLabel} menuItems={menuItems}/>
                        <Stack align='center' direction='row'>
                        </Stack>
                    </Flex>
                    <br/>
                    <IsDoneSwitch isDone={isDone} handleIsDoneChange={handleIsDoneChange}/>
                    <PriceRangeSlider 
                        minPrice={minPrice} 
                        maxPrice={maxPrice} 
                        handleMinChange={handleMinChange} 
                        handleMaxChange={handleMaxChange} 
                    />
                </CardBody>
                </Card>
            </Stack>
            <Box p={2} ></Box>
            {jobAds && <SearchResults jobAds={jobAds as JobAd[]}/>}
            {/* {isLoading && 'Loading...'} */}
            {error && 'Error: ' + error}
        </Box>
    );
}

export default Searchbar;