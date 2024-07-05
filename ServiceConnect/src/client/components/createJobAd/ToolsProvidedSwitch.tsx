import { Switch, FormControl, FormLabel, Flex } from '@chakra-ui/react'

const ToolsProvidedSwitch = (
    { 
        toolsProvided, 
        handleToolsProvidedChange }: 
    { 
        toolsProvided: boolean, 
        handleToolsProvidedChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
    }
    ) => {
    return (
        <FormControl>
            <Flex>
                <FormLabel htmlFor='isChecked'>Tools provided?</FormLabel>
                <Switch 
                    colorScheme='purple' 
                    isChecked={toolsProvided} 
                    onChange={handleToolsProvidedChange}
                    size='md'
                />
            </Flex>
        </FormControl>
    );
}

export default ToolsProvidedSwitch;