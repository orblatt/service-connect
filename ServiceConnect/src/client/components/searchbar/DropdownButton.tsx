import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export type MenuInput = {
    menuButtonLabel: string,
    menuItems: React.ReactElement[]
}

export const DropdownButton = ( { 
    menuButtonLabel, 
    menuItems 
}: MenuInput
) => {
    // zIndex is set to 2 to make sure the dropdown is on top of the other elements such as the range slider 
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown/>}>
                { menuButtonLabel }
            </MenuButton>
            <MenuList zIndex="2" > 
                { ...menuItems }
            </MenuList>
        </Menu>
    );
};