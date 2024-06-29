import React, { useState } from 'react';
import { Stack, Card, CardHeader, CardBody, Heading, Flex } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import JobCategoriesDropdown from './JobCategoriesDropdown';
import IsDoneSwitch from './IsDoneSwitch';
import { PriceSlider, PriceProps } from './PriceSlider';
import { prices } from '../../../config';


const Searchbar = () => {
    const { defaultMinPrice, defaultMaxPrice } = prices;
    const [minPrice, setMinPrice] = useState<PriceProps>({valueAsString: defaultMinPrice.toString(), valueAsNumber: defaultMinPrice});
    const [maxPrice, setMaxPrice] = useState<PriceProps>({valueAsString: defaultMaxPrice.toString(), valueAsNumber: defaultMaxPrice});
    const [isDone, setIsDone] = useState(false);

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
        <Stack spacing='4'>
            <Card key='md' size='md' variant='elevated'>
            <CardHeader>
                <Heading size='md'><Flex> Search &nbsp; <FiSearch/></Flex></Heading>
            </CardHeader>
            <CardBody>
                <Flex>
                    <JobCategoriesDropdown />
                    <Stack align='center' direction='row'>
                    </Stack>
                </Flex>
                <br/>
                <IsDoneSwitch isDone={isDone} handleIsDoneChange={handleIsDoneChange}/>
                <PriceSlider 
                    minPrice={minPrice} 
                    maxPrice={maxPrice} 
                    handleMinChange={handleMinChange} 
                    handleMaxChange={handleMaxChange} 
                />
            </CardBody>
            </Card>
        </Stack>
    );
}

export default Searchbar;