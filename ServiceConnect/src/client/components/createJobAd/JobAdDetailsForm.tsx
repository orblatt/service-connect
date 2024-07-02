import React from 'react';
import { AbsoluteCenter, Box, Divider, Flex, FormControl, FormLabel, GridItem, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Textarea } from '@chakra-ui/react'
import { PriceSlider } from './PriceSlider';
import DurationNumberInput from './DurationNumberInput';
import CategorySpecificFormElements from './CategorySpecificFormElements';

interface JobAdDetailsFormProps {
    category: string;
    title: string;
    description: string;
    price: number;
    city: string;
    duration: number;
    youngestChildAge: number;
    toolsProvided: boolean;
    numberOfRooms: number;
    handlers: {
        handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        handlePriceChange: (newPrice: number) => void;
        handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        handleDurationChange: (newDuration: number) => void;
        handleYoungestChildAgeChange: (newYoungestChildAge: number) => void;
        handleToolsProvidedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleNumberOfRoomsChange: (newNumberOfRooms: number) => void;
    };
}


const JobAdDetailsForm: React.FC<JobAdDetailsFormProps> = ({
    category, 
    title, 
    description, 
    price, 
    city, 
    duration, 
    youngestChildAge,
    toolsProvided,
    numberOfRooms,
    handlers: {
        handleTitleChange,
        handleDescriptionChange,
        handlePriceChange,
        handleCityChange,
        handleDurationChange,
        handleYoungestChildAgeChange,
        handleToolsProvidedChange,
        handleNumberOfRoomsChange
    }
}) => {    
    return (
        <FormControl>
            <Stack spacing='4'>
                <FormControl mr="5%">
                    <FormLabel htmlFor="title" fontWeight={'normal'}>
                        Title
                    </FormLabel>
                    <Input 
                        id="title" 
                        placeholder="Babysitting 3 Kids" 
                        value={title}
                        onChange={handleTitleChange}
                        shadow="md"
                        focusBorderColor="purple.500"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description" fontWeight={'normal'}>
                        Description
                    </FormLabel>
                    <Textarea
                        id="description"
                        placeholder="Join our family! We need a caring babysitter for our three kids (ages 3, 5, and 8), weekdays from 3 PM to 7 PM."
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={3}
                        shadow="md"
                        focusBorderColor="purple.500"
                        fontSize={{
                            md: 'md',
                        }}
                    />
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel htmlFor="city" fontWeight={'normal'}>
                        Address
                    </FormLabel>
                    <Select
                    id="city"
                    name="city"
                    autoComplete="city"
                    placeholder="Select City"
                    value={city}
                    onChange={handleCityChange}
                    focusBorderColor="purple.500"
                    shadow="md"
                    size="md"
                    w="full"
                    rounded="md">
                    <option>Tel Aviv</option>
                    <option>Ramat Gan</option>
                    <option>Petah Tikva</option>
                    </Select>
                </FormControl>
                <PriceSlider
                    price={price}
                    handlePriceChange={handlePriceChange}
                />
                <DurationNumberInput
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                />
                <Box position='relative' padding='7'>
                <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        Category Specific Details
                    </AbsoluteCenter>
                </Box>
                <CategorySpecificFormElements 
                    category={category}
                    toolsProvided={toolsProvided}
                    handleToolsProvidedChange={handleToolsProvidedChange}
                    numberOfRooms={numberOfRooms}
                    handleNumberOfRoomsChange={handleNumberOfRoomsChange}
                    youngestChildAge={youngestChildAge}
                    handleYoungestChildAgeChange={handleYoungestChildAgeChange}
                />
                
            </Stack>
        </FormControl>
    );
}

export default JobAdDetailsForm;