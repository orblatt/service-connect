import YoungestChildAgeNumberInput from "./YoungestChildAgeNumberInput";
import RoomsNumberInput from "./RoomsNumberInput";
import ToolsProvidedSwitch from "./ToolsProvidedSwitch";

interface CategorySpecificFormElementsProps {
    category: string;
    toolsProvided: boolean;
    handleToolsProvidedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numberOfRooms: number;
    handleNumberOfRoomsChange: (newNumberOfRooms: number) => void;
    youngestChildAge: number;
    handleYoungestChildAgeChange: (newYoungestChildAge: number) => void;
}

const CategorySpecificFormElements: React.FC<CategorySpecificFormElementsProps> = ({ 
    category,
    toolsProvided,
    handleToolsProvidedChange,
    numberOfRooms,
    handleNumberOfRoomsChange,
    youngestChildAge,
    handleYoungestChildAgeChange
}) => {
    switch (category) {
        case 'Babysitting':
            return (
                <YoungestChildAgeNumberInput 
                    youngestChildAge={youngestChildAge}
                    handleYoungestChildAgeChange={handleYoungestChildAgeChange}
                />
            );
        case 'House Keeping':
            return (
                <RoomsNumberInput 
                    numberOfRooms={numberOfRooms}
                    handleNumberOfRoomsChange={handleNumberOfRoomsChange}
                />
            );
        case 'Gardening':
            return (
                <ToolsProvidedSwitch 
                    toolsProvided={toolsProvided}
                    handleToolsProvidedChange={handleToolsProvidedChange}
                />
            );
    }
};

export default CategorySpecificFormElements;