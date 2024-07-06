import { Box, Flex, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { rooms as roomsConfig } from "../../../config";

interface RoomsNumberInputProps {
    numberOfRooms: number;
    handleNumberOfRoomsChange: (newNumberOfRooms: number) => void;
}

const RoomsNumberInput: React.FC<RoomsNumberInputProps> = ({ numberOfRooms, handleNumberOfRoomsChange }) => {
    return (
        <Box>
            <Flex maxW='400px'>
                <Box><FormLabel fontWeight={'normal'} paddingRight={4}>Rooms</FormLabel></Box>
                <NumberInput 
                    id='rooms-number-input'
                    aria-label='rooms-number-input'
                    shadow="md"
                    focusBorderColor="purple.500"
                    value={numberOfRooms || roomsConfig.min}
                    defaultValue={numberOfRooms}
                    min={roomsConfig.min}
                    max={roomsConfig.max}
                    step={roomsConfig.step}
                    minH={10}
                    maxH={10}
                    minW={103}
                    maxW={103}
                    onChange={(valueAsString, valueAsNumber) => handleNumberOfRoomsChange(valueAsNumber)}
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

export default RoomsNumberInput;