import { Box, FormLabel, HStack, Text, VStack } from "@chakra-ui/react"
import IsDurationExactToggle from "./IsDurationExactToggle";
import DurationRangeSlider from "./DurationRangeSlider";
import ExactDurationNumberInput from "./ExactDurationNumberInput";

export interface DurationProps {
    valueAsString: string;
    valueAsNumber: number; 
}

interface DurationComponentsProps {
    minDuration: DurationProps,
    maxDuration: DurationProps,
    exactDuration: DurationProps,
    isDurationExact: boolean,
    handleMinDurationChange: (valueAsString: string, valueAsNumber: number) => void,
    handleMaxDurationChange: (valueAsString: string, valueAsNumber: number) => void,
    handleExactDurationChange: (valueAsString: string, valueAsNumber: number) => void,
    handleIsDurationExactChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DurationComponents: React.FC<DurationComponentsProps> = ({ 
    minDuration, maxDuration, exactDuration, isDurationExact, handleMinDurationChange, handleMaxDurationChange, handleExactDurationChange, handleIsDurationExactChange
}) => {
    return (
        <Box>
            <HStack alignItems={'top'}>
                <FormLabel>Duration (Hours):</FormLabel>
                <VStack alignItems={'left'}>
                    <IsDurationExactToggle 
                        isDurationExact={isDurationExact} 
                        handleIsDurationExactChange={handleIsDurationExactChange}
                    />
                    {
                        !isDurationExact ? 
                        (
                            <DurationRangeSlider 
                                minDuration={minDuration} 
                                maxDuration={maxDuration} 
                                handleMinDurationChange={handleMinDurationChange} 
                                handleMaxDurationChange={handleMaxDurationChange}
                            />
                        ) : 
                        (
                            <ExactDurationNumberInput 
                                exactDuration={exactDuration} 
                                handleExactDurationChange={handleExactDurationChange}
                            />
                        )
                    }
                    

                </VStack>

            </HStack>
        </Box>
    )
}
