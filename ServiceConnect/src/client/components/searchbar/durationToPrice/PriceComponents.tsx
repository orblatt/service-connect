import { Box, FormLabel, HStack, Text, VStack } from "@chakra-ui/react"
import IsDurationExactToggle from "./IsDurationExactToggle";
import DurationRangeSlider from "./DurationRangeSlider";
import ExactDurationNumberInput from "./ExactDurationNumberInput";
import { PriceProps } from "../PriceRangeSlider";
import HourlyRateNumberInput from "./HourlyRateNumberInput";
import MinimumPay from "./MininumPay";

interface PriceComponentsProps {
    minPrice: PriceProps,
    hourlyRate: PriceProps,
    handleHourlyRateChange: (valueAsString: string, valueAsNumber: number) => void,
    duration: number
}

export const PriceComponents: React.FC<PriceComponentsProps> = ({ 
    minPrice, hourlyRate, handleHourlyRateChange, duration
}) => {
    return (
        <Box>
            <HStack alignItems={'top'}>
                <FormLabel>Hourly Rate (₪):</FormLabel>
                <HourlyRateNumberInput
                hourlyRate={hourlyRate}
                handleHourlyRateChange={handleHourlyRateChange}
                minDuration={duration}
                />
            </HStack>
            <MinimumPay minDuration={duration} hourlyRate={hourlyRate.valueAsNumber}/>
        </Box>
    )
}
