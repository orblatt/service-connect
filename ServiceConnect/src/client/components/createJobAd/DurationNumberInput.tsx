import { Box, Flex, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { duration as durationConfig } from "../../../config";

interface DurationNumberInputProps {
    duration: number;
    handleDurationChange: (newDuration: number) => void;
}

const DurationNumberInput: React.FC<DurationNumberInputProps> = ({ duration, handleDurationChange }) => {
    return (
        <Box>
            <Box h={2}></Box>
            <Flex maxW='150px'>
                <Box alignContent={'center'} flexShrink={0} paddingRight={0.5}><FormLabel fontWeight={'normal'}>Duration (Hours)</FormLabel></Box>
                <NumberInput 
                    id='duration-number-input'
                    aria-label='duration-number-input'
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={duration}
                    defaultValue={duration}
                    min={durationConfig.min}
                    max={durationConfig.max}
                    minH={10}
                    maxH={10}
                    minW={102}
                    maxW={102}
                    onChange={(valueAsString, valueAsNumber) => handleDurationChange(valueAsNumber)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>
        </Box>
    )
}

export default DurationNumberInput;