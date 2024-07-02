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
}

export const PriceSlider: React.FC<PriceSliderProps> = ({ price, handlePriceChange }) => {
    const [sliderValue, setSliderValue] = useState(price);
    const [valueAsString, setValueAsString] = useState(price.toString());

    useEffect(() => {
        setSliderValue(price);
        setValueAsString(price.toString());
    }, [price]);


    const handleNumberInputChange = (valueAsString: string, valueAsNumber: number) => {
        if (valueAsNumber !== sliderValue) {
            handlePriceChange(valueAsNumber);
            setSliderValue(valueAsNumber);
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
                <Box><FormLabel fontWeight={'normal'}>Price</FormLabel></Box>
                <Box w={3}></Box>
                <Slider 
                    id='price-slider'
                    aria-label='price-slider' 
                    value={price}
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
            <br/>
            <Flex>
                <NumberInput 
                    maxW="150px" 
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={price} 
                    min={prices.min} 
                    max={prices.max} 
                    step={prices.step} 
                    onChange={handleNumberInputChange}
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
