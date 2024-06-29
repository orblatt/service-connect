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
    NumberDecrementStepper
  } from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'
import { prices } from '../../../config';

const PriceSlider = () => {
  const [minPrice, setMinPrice] = useState<number>(prices.defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(prices.defaultMaxPrice);
  
  const handleChange = (values: number[]) => {
    handleMinChange(values[0]);
    handleMaxChange(values[1]);
  };

  const handleMinChange = (minPrice: string | number) => {
    const newMin = typeof minPrice === 'string' ? parseFloat(minPrice) : minPrice;
    if (newMin <= maxPrice) { // Ensuring new min is not greater than current max
        setMinPrice(newMin);
    }
  };

  const handleMaxChange = (maxPrice: string | number) => {
    const newMax = typeof maxPrice === 'string' ? parseFloat(maxPrice) : maxPrice;
    if (newMax >= minPrice) { // Ensuring new max is not less than current min
        setMaxPrice(newMax);
      }
  };


    return (
        <Box>
            <Flex>
                <Text>Price Range</Text>
                <RangeSlider 
                    aria-label={['min', 'max']} 
                    defaultValue={[minPrice, maxPrice]}
                    value={[minPrice, maxPrice]}
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
            <Flex>
                <NumberInput 
                    maxW="140px" 
                    mr="2rem" 
                    value={minPrice} 
                    min={prices.min} 
                    max={maxPrice} 
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
                    value={maxPrice} 
                    min={prices.min} 
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

export default PriceSlider;