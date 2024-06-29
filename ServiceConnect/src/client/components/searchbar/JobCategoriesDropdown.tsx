import { MenuItem } from "@chakra-ui/react";
import { DropdownButton } from "./DropdownButton";
import { jobCategories } from "../../../config";
import { useState } from "react";

const JobCategoriesDropdown = ( 
) => {
    const [menuButtonLabel, setMenuButtonLabel] = useState('Category');
    const menuItems: React.ReactElement<typeof MenuItem>[] = jobCategories.map((category: string, index) => {
        return <MenuItem key={index} onClick={() => setMenuButtonLabel(category)}>{category}</MenuItem>
    });

    return <DropdownButton menuButtonLabel={menuButtonLabel} menuItems={menuItems} />  
};

export default JobCategoriesDropdown;