import { Switch, FormControl, FormLabel, Flex } from '@chakra-ui/react'

const IsDoneSwitch = (
    { 
        isDone, 
        handleIsDoneChange }: 
    { 
        isDone: boolean, 
        handleIsDoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
    }
    ) => {
    return (
        <FormControl>
            <Flex>
                <FormLabel htmlFor='isChecked'>Show Open Jobs?</FormLabel>
                <Switch 
                    colorScheme='purple' 
                    isChecked={!isDone} 
                    onChange={handleIsDoneChange}
                    size='md'
                />
            </Flex>
        </FormControl>
    );
}

export default IsDoneSwitch;