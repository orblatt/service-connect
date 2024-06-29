import {
    Select,
    Button
  } from '@chakra-ui/react'

export type selectInput = {
    label: string,
    selectItems: React.ReactElement<{value: string, children: string}, 'option'>[]
};

export const SelectButton = ( { 
    label, 
    selectItems 
}: selectInput
) => {
    return (
        <Select 
    placeholder={label}
    size="lg"
    fontWeight="bold" // Makes the text bold
>
    {selectItems}
</Select>

    );
};

{/* <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option> */}


// import {
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     Button
//   } from '@chakra-ui/react'
// import { FiChevronDown } from 'react-icons/fi'

// export type MenuInput = {
//     menuButtonLabel: string,
//     menuItems: React.ReactElement<typeof MenuItem>[]
// }

// export const DropdownButton = ( { 
//     menuButtonLabel, 
//     menuItems 
// }: MenuInput
// ) => {
//     return (
//         <Menu>
//             <MenuButton as={Button} rightIcon={<FiChevronDown />}>
//                 { menuButtonLabel }
//             </MenuButton>
//             <MenuList>
//                 { ...menuItems }
//             </MenuList>
//         </Menu>
//     );
// };