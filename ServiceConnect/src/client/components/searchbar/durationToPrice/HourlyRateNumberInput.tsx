import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { PriceProps } from "../PriceRangeSlider"
import { prices } from "../../../../config"
import { DurationProps } from "./DurationComponents"

interface HourlyRateNumberInputProps {
    hourlyRate: PriceProps,
    handleHourlyRateChange: (valueAsString: string, valueAsNumber: number) => void
    minDuration: number
}

const HourlyRateNumberInput: React.FC<HourlyRateNumberInputProps>  = ({hourlyRate, handleHourlyRateChange, minDuration}) => {
    return (
        <NumberInput 
            maxW="102px" 
            shadow="md"
            focusBorderColor="purple.500"
            value={hourlyRate.valueAsNumber} 
            min={prices.min} 
            max={prices.max / minDuration} 
            step={prices.step} 
            onChange={handleHourlyRateChange}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )

}

export default HourlyRateNumberInput


