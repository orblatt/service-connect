import { MenuItem } from "@chakra-ui/react";
import { DropdownButton } from "./DropdownButton";

const JobCategoriesDropdown = ( 
    {
        menuButtonLabel,
        menuItems
    } :
    {
        menuButtonLabel: string,
        menuItems: React.ReactElement<typeof MenuItem>[]
    }
) => {
    return <DropdownButton menuButtonLabel={menuButtonLabel} menuItems={menuItems} />  
};

export default JobCategoriesDropdown;