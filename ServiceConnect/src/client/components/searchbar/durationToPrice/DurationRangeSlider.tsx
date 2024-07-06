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
import { duration as durationConfig } from '../../../../config';
import { DurationProps } from './DurationComponents';

interface DurationRangeSliderProps {
    minDuration: DurationProps;
    maxDuration: DurationProps;
    handleMinDurationChange: (valueAsString: string, valueAsNumber: number) => void;
    handleMaxDurationChange: (valueAsString: string, valueAsNumber: number) => void;
}

const DurationRangeSlider: React.FC<DurationRangeSliderProps> = ({ 
    minDuration, maxDuration, handleMinDurationChange, handleMaxDurationChange
}) => {
  
    const handleChange = (values: number[]) => {
        handleMinDurationChange(values[0].toString(), values[0]);
        handleMaxDurationChange(values[1].toString(), values[1]);
    };



    return (
        <Box>
            <Flex maxW='400px'>
                <Flex marginBottom={['2', '1']}>
                <NumberInput 
                    minW='60px'
                    maxW="60px" 
                    value={minDuration.valueAsNumber || durationConfig.defaultMin} 
                    min={durationConfig.min} 
                    max={maxDuration.valueAsNumber} 
                    step={durationConfig.step} 
                    onChange={handleMinDurationChange} 
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
                    minW='60px'
                    maxW="60px" 
                    value={maxDuration.valueAsNumber || durationConfig.max} 
                    min={minDuration.valueAsNumber} 
                    max={durationConfig.max} 
                    step={durationConfig.step} 
                    onChange={handleMaxDurationChange} 
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
                    minW = {'150px'}
                    maxW = {'150px'}
                    aria-label={['min', 'max']} 
                    defaultValue={[minDuration.valueAsNumber || durationConfig.min, maxDuration.valueAsNumber || durationConfig.max]}
                    value={[minDuration.valueAsNumber, maxDuration.valueAsNumber]}
                    min={durationConfig.min}
                    max={durationConfig.max}
                    step={durationConfig.step}
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

export default DurationRangeSlider;