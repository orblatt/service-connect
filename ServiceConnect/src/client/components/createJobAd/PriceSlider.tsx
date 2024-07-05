import React, { useEffect, useState } from 'react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';
import { prices } from '../../../config';

interface PriceSliderProps {
    price: number;
    handlePriceChange: (newPrice: number) => void;
    duration: number;
}

export const PriceSlider: React.FC<PriceSliderProps> = ({ price, handlePriceChange, duration }) => {
    const [sliderValue, setSliderValue] = useState(price);
    const [valueAsString, setValueAsString] = useState(price.toString());

    useEffect(() => {
        setSliderValue(price);
        setValueAsString(price.toString());
    }, [price]);


    const handleTotalPriceChange = (valueAsString: string, valueAsNumber: number) => {
        if (valueAsNumber !== sliderValue) {
            handlePriceChange(valueAsNumber);
            setSliderValue(valueAsNumber);
        }
        setValueAsString(valueAsString);
    }

    const handleHourlyRateChange = (valueAsString: string, valueAsNumber: number) => {
        if (valueAsNumber !== sliderValue * duration) {
            handlePriceChange(valueAsNumber * duration);
            setSliderValue(valueAsNumber * duration);
        }
        setValueAsString(valueAsString);
    }



    const handleSliderChange = (newPrice: number) => {
        if (newPrice !== sliderValue) {
            setSliderValue(newPrice);
            setValueAsString(newPrice.toString());
            handlePriceChange(newPrice);
        }
    };

    return (
        <Box>
            <Box h={2}></Box>
            <Flex maxW='400px'>
                <Box alignContent={'center'} paddingRight={5}><FormLabel fontWeight={'normal'}>Total Price (₪)</FormLabel></Box>
                <NumberInput 
                    maxW="102px" 
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={price} 
                    min={prices.min} 
                    max={prices.max} 
                    step={prices.step} 
                    minH={10}
                    maxH={10}
                    onChange={handleTotalPriceChange}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Box w={3}></Box>
                
            </Flex>
            <Box h={2}></Box>
            <Flex maxW='400px'>
                <Box alignContent={'center'}><FormLabel fontWeight={'normal'} paddingRight={3}>Hourly Rate (₪)</FormLabel></Box>
                <NumberInput 
                    maxW="102px" 
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={Math.ceil(price / duration)} 
                    min={Math.ceil(prices.min / duration) || 1} 
                    max={Math.round(prices.max / duration)} 
                    step={prices.step} 
                    minH={10}
                    maxH={10}
                    onChange={handleHourlyRateChange}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Box w={3}></Box>
                
            </Flex>
            <br/>
            <Flex>
                <Slider 
                    id='price-slider'
                    aria-label='price-slider' 
                    value={price}
                    maxW="400px" 
                    defaultValue={price}
                    min={prices.min}
                    max={prices.max}
                    step={prices.step}
                    onChange={handleSliderChange}
                >
                    <SliderTrack bg='purple.200'>
                        <SliderFilledTrack bg='purple.500' />
                    </SliderTrack>
                    <SliderThumb boxSize={7}>
                        <Box color='purple.500' as={MdGraphicEq} />
                    </SliderThumb>
                </Slider>
            </Flex>
        </Box>
    );
};
