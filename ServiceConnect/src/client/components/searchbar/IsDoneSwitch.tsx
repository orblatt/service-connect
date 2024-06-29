import { Switch } from '@chakra-ui/react'

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
        <Switch 
            colorScheme='purple' 
            isChecked={!isDone} 
            onChange={handleIsDoneChange}
        />
    );
}

export default IsDoneSwitch;