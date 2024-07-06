import { Box, Flex, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { duration as durationConfig } from "../../../../config";
import { DurationProps } from "./DurationComponents";

interface ExactDurationNumberInputProps {
    exactDuration: DurationProps;
    handleExactDurationChange: (valueAsString: string, valueAsNumber: number) => void;
}

const ExactDurationNumberInput: React.FC<ExactDurationNumberInputProps> = ({ exactDuration, handleExactDurationChange }) => {
    return (
        <Box>
            <Flex maxW='400px'>
                <Box alignContent={'center'}><FormLabel>Hours</FormLabel></Box>
                <NumberInput 
                    id='exact-duration-number-input'
                    aria-label='exact-duration-number-input'
                    shadow="md"
                    focusBorderColor="purple.500"
                    minW='60px'
                    maxW='60px'
                    value={exactDuration.valueAsNumber}
                    defaultValue={exactDuration.valueAsNumber}
                    min={durationConfig.min}
                    max={durationConfig.max}
                    minH={10}
                    maxH={10}
                    onChange={handleExactDurationChange}
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

export default ExactDurationNumberInput;