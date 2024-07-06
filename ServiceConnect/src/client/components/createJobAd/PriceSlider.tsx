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
    };

    const handleHourlyRateChange = (valueAsString: string, valueAsNumber: number) => {
        const newTotalPrice = valueAsNumber * duration;
        if (newTotalPrice !== sliderValue) {
            handlePriceChange(newTotalPrice);
            setSliderValue(newTotalPrice);
        }
        setValueAsString(newTotalPrice.toString());
    };

    const handleSliderChange = (newPrice: number) => {
        if (newPrice !== sliderValue) {
            setSliderValue(newPrice);
            setValueAsString(newPrice.toString());
            handlePriceChange(newPrice);
        }
    };

    const hourlyRateCeiled = Math.ceil(price / duration);
    const hourlyRateFloored = Math.floor(price / duration) === 0 ? 1 : Math.floor(price / duration);
    const maxHourlyRateCeiled = Math.ceil(prices.max / duration);
    const maxHourlyRateFloored = Math.floor(prices.max / duration);
    const hourlyRateMaximum = hourlyRateCeiled * duration > prices.max  ? 
    maxHourlyRateFloored : hourlyRateCeiled * duration;
    const currentPrice = price && price >= prices.min
    ? price 
    : (hourlyRateFloored && duration
        ? hourlyRateFloored * duration
        : 1);

    return (
        <Box>
            {/* Total Price Input */}
            <Flex maxW='400px' mb={2}>
                <Box alignContent={'center'} paddingRight={5}><FormLabel fontWeight={'normal'}>Total Price (₪)</FormLabel></Box>
                <NumberInput 
                    maxW="102px" 
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={currentPrice} 
                    min={hourlyRateFloored * duration} 
                    max={prices.max} 
                    step={prices.step} 
                    onChange={handleTotalPriceChange}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            {/* Hourly Rate Input */}
            <Flex maxW='400px' mb={2}>
                <Box alignContent={'center'}><FormLabel fontWeight={'normal'} paddingRight={3}>Hourly Rate (₪)</FormLabel></Box>
                <NumberInput 
                    maxW="102px" 
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={hourlyRateFloored || 1} 
                    min={Math.ceil(prices.min / duration)} 
                    max={hourlyRateMaximum} 
                    step={prices.step} 
                    onChange={handleHourlyRateChange}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            {/* Price Slider */}
            <Slider 
                id='price-slider'
                aria-label='price-slider' 
                value={price}
                maxW="240px" 
                min={prices.min * duration}
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
        </Box>
    );
};