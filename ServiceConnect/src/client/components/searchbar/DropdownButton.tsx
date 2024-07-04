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
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown/>}>
                { menuButtonLabel }
            </MenuButton>
            <MenuList>
                { ...menuItems }
            </MenuList>
        </Menu>
    );
};