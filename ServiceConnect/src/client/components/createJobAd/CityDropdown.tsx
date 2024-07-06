import { FormControl, FormLabel, Select, GridItem } from "@chakra-ui/react";
import { DropdownButton } from "../searchbar/DropdownButton";

interface CityDropdownProps {
    menuButtonLabel: string;
    menuItems: React.ReactElement[];
}

const CityDropdown:  React.FC<CityDropdownProps> = ({ menuButtonLabel, menuItems }) => {
    return (
        <DropdownButton menuButtonLabel={menuButtonLabel} menuItems={menuItems}/>
        // <FormControl as={GridItem} colSpan={[6, 3]}>
        //     <FormLabel htmlFor="city" fontWeight={'normal'}>
        //         City
        //     </FormLabel>
        //     <Select
        //         id="city"
        //         name="city"
        //         autoComplete="city"
        //         placeholder="Select City"
        //         value={city}
        //         onChange={handleCityChange}
        //         focusBorderColor="purple.500"
        //         shadow="md"
        //         size="md"
        //         w="full"
        //         rounded="md"
        //     >
        //         <option>Tel Aviv</option>
        //         <option>Ramat Gan</option>
        //         <option>Petah Tikva</option>
        //     </Select>
        // </FormControl>
    );
}

export default CityDropdown;