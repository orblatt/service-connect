import { DropdownButton } from "../searchbar/DropdownButton";

interface CityDropdownProps {
    menuButtonLabel: string;
    menuItems: React.ReactElement[];
}

const CityDropdown:  React.FC<CityDropdownProps> = ({ menuButtonLabel, menuItems }) => {
    return (
        <DropdownButton menuButtonLabel={menuButtonLabel} menuItems={menuItems}/>
    );
}

export default CityDropdown;