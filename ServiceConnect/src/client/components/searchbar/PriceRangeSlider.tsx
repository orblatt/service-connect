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
               <FormLabel flexShrink={0} alignItems={'center'} 
               paddingRight={['7', '8']}>
                Total pay (₪)</FormLabel>
                <Flex marginBottom={['2', '1']}>
                <NumberInput 
                    minW='90px'
                    maxW="90px" 
                    value={minPrice.valueAsNumber || prices.min} 
                    min={prices.min} 
                    max={maxPrice.valueAsNumber} 
                    step={prices.step} 
                    onChange={handleMinChange} 
                    marginTop={0}
                > 
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text alignContent={'center'} paddingLeft={3} paddingRight={3}>-</Text>
                <NumberInput 
                    minW='90px'
                    maxW="90px" 
                    value={maxPrice.valueAsNumber || prices.max} 
                    min={minPrice.valueAsNumber} 
                    max={prices.max} 
                    step={prices.step} 
                    onChange={handleMaxChange} 
                    marginTop={0}
                > 
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                </Flex>
                
            </Flex>
            <Box h={1}></Box>
            <RangeSlider 
                    minW = {['330px', '340px']}
                    maxW = {['330px', '340px']}
                    aria-label={['min', 'max']} 
                    defaultValue={[minPrice.valueAsNumber || prices.min, maxPrice.valueAsNumber || prices.max]}
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
        </Box>
    );
};