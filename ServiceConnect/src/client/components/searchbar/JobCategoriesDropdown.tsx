import { DropdownButton } from "./DropdownButton";

const JobCategoriesDropdown = ( 
    {
        menuButtonLabel,
        menuItems
    } :
    {
        menuButtonLabel: string,
        menuItems: React.ReactElement[]
    }
) => {
    return <DropdownButton menuButtonLabel={menuButtonLabel} menuItems={menuItems} />  
};

export default JobCategoriesDropdown;