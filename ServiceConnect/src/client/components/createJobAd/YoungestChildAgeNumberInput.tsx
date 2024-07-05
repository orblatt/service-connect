import { Box, Flex, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { youngestChildAge as youngestChildAgeConfig } from "../../../config";

interface YoungestChildAgeNumberInputProps {
    youngestChildAge: number;
    handleYoungestChildAgeChange: (newYoungestChildAge: number) => void;
}

const YoungestChildAgeNumberInput: React.FC<YoungestChildAgeNumberInputProps> = ({ youngestChildAge, handleYoungestChildAgeChange }) => {
    return (
        <Box>
            <Flex maxW='400px'>
                <Box><FormLabel fontWeight={'normal'}>Youngest child age</FormLabel></Box>
                <NumberInput 
                    id='youngest-child-age-number-input'
                    aria-label='youngest-child-age-number-input'
                    shadow="md"
                    focusBorderColor="purple.500"
                    maxW='80px'
                    value={youngestChildAge}
                    defaultValue={youngestChildAge}
                    min={youngestChildAgeConfig.min}
                    max={youngestChildAgeConfig.max}
                    minH={10}
                    maxH={10}
                    onChange={(valueAsString, valueAsNumber) => handleYoungestChildAgeChange(valueAsNumber)}
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

export default YoungestChildAgeNumberInput;