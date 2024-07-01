import { Button, ButtonGroup, Flex, useToast } from "@chakra-ui/react";
import { defaultCategory, defaultCityPlaceholder } from "../../../config";

interface NavigateFormButtonsProps {
    tabIndex: number;
    handleTabsChange: (index: any) => void;
    category: string;
    title: string;
    description: string;
    address: string;
}

const NavigateFormButtons: React.FC<NavigateFormButtonsProps> = ({ tabIndex, handleTabsChange, category, title, description, address }) => {
    const toast = useToast()
    const allFieldsFilled = category !== defaultCategory && title !== '' && description !== '' && address !== defaultCityPlaceholder
    return (
        <ButtonGroup mt="2%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                    handleTabsChange(tabIndex - 1)
                }}
                isDisabled={tabIndex === 0}
                colorScheme="purple"
                variant={tabIndex === 0 ? 'outline' : 'solid'}
                w="7rem"
                mr="5%">
                Back
              </Button>
              {tabIndex === 0 || tabIndex === 1 ? (
              
              <Button
                w="7rem"
                mr="5%"
                isDisabled={tabIndex === 0 && category === defaultCategory || tabIndex === 1 && !allFieldsFilled}
                onClick={() => {
                    handleTabsChange(tabIndex + 1)
                }}
                colorScheme="purple"
                variant={tabIndex === 0 || allFieldsFilled ? 'solid' : 'outline'}>
                Next
              </Button>
              ) : null}
              {tabIndex === 2 ? (
              <Button
                w="7rem"
                mr="5%"
                colorScheme="red"
                variant="solid"
                isDisabled={!allFieldsFilled}
                onClick={() => {
                  toast({
                    title: 'Ad created.',
                    description: "We've created your ad for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            ) : null}
            </Flex>
          </Flex>
        </ButtonGroup>
    )
}

export default NavigateFormButtons;