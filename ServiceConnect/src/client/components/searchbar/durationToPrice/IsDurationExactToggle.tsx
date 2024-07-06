import { Box, Text, Switch, FormControl, FormLabel, Flex } from "@chakra-ui/react"

interface IsDurationExactToggleProps {
    isDurationExact: boolean,
    handleIsDurationExactChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const IsDurationExactToggle: React.FC<IsDurationExactToggleProps> = ({ isDurationExact, handleIsDurationExactChange }) => {
    return (
        <FormControl>
            <Flex>
                <FormLabel htmlFor='isChecked'>Exact</FormLabel>
                <Switch 
                    isChecked={!isDurationExact} 
                    onChange={handleIsDurationExactChange}
                    size='md'
                    sx={{
                        '& .chakra-switch__track': {
                          bg: 'purple.500', 
                          _checked: {
                            bg: 'purple.500',
                          }
                        },
                        '& .chakra-switch__thumb': {
                          bg: 'white',
                        }
                      }}
                />
                <FormLabel htmlFor='isChecked' paddingLeft={3}>Range</FormLabel>
            </Flex>
        </FormControl>
    )
}

export default IsDurationExactToggle;