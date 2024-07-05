import React from 'react';
import { Heading, useBreakpointValue, Box, Divider, FormControl, FormLabel, GridItem, Input, Select, Stack, Textarea } from '@chakra-ui/react'
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

function useResponsiveRows() {
    return useBreakpointValue({ base: 4, sm: 4, md: 3 });
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
    const titlePlaceholderText = titlePlaceholder(category);    
    const descriptionPlaceholderText = descriptionPlaceholder(category);
    const responsiveRows = useResponsiveRows();
    const headline = category === 'Category'
    ? 'Select a Category'
    : category
    return (
        <FormControl>
            <Stack spacing='4' overflow='visible'>
                <Heading as='h3' size='lg' color='purple.500'>{headline}</Heading>
                <FormControl mr="5%">
                    <FormLabel htmlFor="title" fontWeight={'normal'}>
                        Title
                    </FormLabel>
                    <Input 
                        id="title" 
                        placeholder={titlePlaceholderText}
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
                        placeholder={descriptionPlaceholderText}
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={responsiveRows}
                        shadow="md"
                        focusBorderColor="purple.500"
                        fontSize={{
                            md: 'md',
                        }}
                    />
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel htmlFor="city" fontWeight={'normal'}>
                        City
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
                    rounded="md"
                    >
                    <option>Tel Aviv</option>
                    <option>Ramat Gan</option>
                    <option>Petah Tikva</option>
                    </Select>
                </FormControl>
                <Stack>
                <DurationNumberInput
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                />
                <PriceSlider
                    price={price}
                    handlePriceChange={handlePriceChange}
                    duration={duration}
                />
                </Stack>
                <Box display="flex" alignItems="center" position="relative" py={7} px={4} width="full">
                    <Divider orientation="horizontal" flex="1" />
                    <Box
                        position="absolute"
                        left="50%"
                        transform="translateX(-50%)"
                        bg="white"
                        px={4}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        fontSize={{ base: "14px", sm: "16px", md: "18px" }} // Responsive font size
                        fontWeight={{ base: "bold", sm: "normal", md: "normal" }} // Bold on mobile, normal on tablet and desktop
                    >
                        Category Specific Details
                    </Box>
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
                <Box h={1}></Box>
                
            </Stack>
        </FormControl>
    );
}

function descriptionPlaceholder (category: string) {
    switch (category) {
        case 'Babysitting':
            return 'Join our family! We need a caring babysitter for our three kids (ages 3, 5, and 8), weekdays from 3 PM to 7 PM.';
        case 'House Keeping':
            return 'Seeking housekeeper to maintain our home in Petah Tikva.';
        case 'Gardening':
            return 'Seeking skilled gardener who loves plants for garden in Tel Aviv.';
        default:
            return 'Enter a description';
    }
}

function titlePlaceholder (category: string) {
    switch (category) {
        case 'Babysitting':
            return 'Babysitting 3 Kids';
        case 'House Keeping':
            return 'Housekeeper Needed';
        case 'Gardening':
            return 'Gardener Wanted Today';
        default:
            return 'Enter a title';
    }
}

export default JobAdDetailsForm;