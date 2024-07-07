import { Box, FormLabel, HStack, Text, VStack } from "@chakra-ui/react"
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
                <FormLabel paddingRight={2}>Hourly Rate (₪):</FormLabel>
                <HourlyRateNumberInput
                hourlyRate={hourlyRate}
                handleHourlyRateChange={handleHourlyRateChange}
                minDuration={duration}
                />
            </HStack>
            <Box h={3}></Box>
            <MinimumPay minDuration={duration} hourlyRate={hourlyRate.valueAsNumber}/>
        </Box>
    )
}
