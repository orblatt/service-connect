import { useState } from 'react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    Text,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel
  } from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'
import { prices } from '../../../config';

export interface PriceProps {
    valueAsString: string;
    valueAsNumber: number; 
}

interface PriceRangeSliderProps {
    minPrice: PriceProps;
    maxPrice: PriceProps;
    handleMinChange: (valueAsString: string, valueAsNumber: number) => void;
    handleMaxChange: (valueAsString: string, valueAsNumber: number) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ minPrice, maxPrice, handleMinChange, handleMaxChange }) => {
  
    const handleChange = (values: number[]) => {
        handleMinChange(values[0].toString(), values[0]);
        handleMaxChange(values[1].toString(), values[1]);
    };



    return (
        <Box>
            <Flex maxW='400px'>
               <FormLabel>Price Range</FormLabel>
                {/* <Text></Text> */}
                <RangeSlider 
                    aria-label={['min', 'max']} 
                    defaultValue={[minPrice.valueAsNumber, maxPrice.valueAsNumber]}
                    value={[minPrice.valueAsNumber, maxPrice.valueAsNumber]}
                    min={prices.min}
                    max={prices.max}
                    step={prices.step}
                    onChange={handleChange}
                >
                <RangeSliderTrack bg='purple.200'>
                <RangeSliderFilledTrack bg='purple.500' />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={7} index={0}>
                <Box color='purple.500' as={MdGraphicEq} />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={7} index={1}>
                <Box color='purple.500' as={MdGraphicEq} />
                </RangeSliderThumb>
                </RangeSlider>
            </Flex>
            <br/>
            <Flex>
                <NumberInput 
                    maxW="140px" 
                    mr="2rem" 
                    value={minPrice.valueAsNumber} 
                    min={prices.min} 
                    max={maxPrice.valueAsNumber} 
                    step={prices.step} 
                    onChange={handleMinChange} 
                > 
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>- &nbsp; &nbsp; &nbsp; &nbsp;</Text>
                <NumberInput 
                    maxW="140px" 
                    mr="2rem" 
                    value={maxPrice.valueAsNumber} 
                    min={minPrice.valueAsNumber} 
                    max={prices.max} 
                    step={prices.step} 
                    onChange={handleMaxChange} 
                > 
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>
        </Box>
    );
};