import React, { useState } from 'react';
import { Card, Stack, useSteps, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, MenuItem } from '@chakra-ui/react';
import JobCategoriesDropdown from '../searchbar/JobCategoriesDropdown';
import { jobCategories, defaultJobAd, defaultCityPlaceholder } from '../../../config';
import JobAdDetailsForm from './JobAdDetailsForm';
import NavigateFormButtons from './NavigateFormButtons';

const steps = [
  { title: 'First', description: 'Select Category' },
  { title: 'Second', description: 'Enter Details' },
  { title: 'Third', description: 'Review Ad' },
];

const CreateJobAdForm = () => {
  const { 
    duration: defaultDuration, 
    youngestChildAge: defaultYoungestChildAge,
    toolsProvided: defaultToolsProvided,
    numberOfRooms: defaultNumberOfRooms
  } = defaultJobAd;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(defaultJobAd.price);
  const [address, setAddress] = useState(defaultCityPlaceholder);
  const [duration, setDuration] = useState(defaultDuration);
  const [youngestChildAge, setYoungestChildAge] = useState(defaultYoungestChildAge);
  const [toolsProvided, setToolsProvided] = useState(defaultToolsProvided);
  const [numberOfRooms, setNumberOfRooms] = useState(defaultNumberOfRooms);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress(event.target.value);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleYoungestChildAgeChange = (newYoungestChildAge: number) => {
    setYoungestChildAge(newYoungestChildAge);
  };

  const handleToolsProvidedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToolsProvided(event.target.checked);
  };

  const handleNumberOfRoomsChange = (newNumberOfRooms: number) => {
    setNumberOfRooms(newNumberOfRooms);
  };

  const [menuButtonLabel, setMenuButtonLabel] = useState('Category');
  const menuItems: React.ReactElement<typeof MenuItem>[] = jobCategories.map(
    (category: string, index) => {
        return <MenuItem 
                  key={index} 
                  onClick={() => setMenuButtonLabel(category)}>
                {category}
              </MenuItem>
    }
  );
  
  const [tabIndex, setTabIndex] = useState(0);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
    setActiveStep(index);
  };

  return (
    <Box>
      <Card key='md' size='md' variant='elevated' p={8}>
        <Stack spacing='4'>
          <Stepper size='lg' index={activeStep} onChange={handleTabsChange} >
            {steps.map((step, index) => (
              <Step key={index} onClick={() => handleTabsChange(index)}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Step 1</Tab>
              <Tab>Step 2</Tab>
              <Tab>Step 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p={2}></Box>
                <JobCategoriesDropdown menuButtonLabel={menuButtonLabel} menuItems={menuItems}/>
                <NavigateFormButtons 
                  tabIndex={tabIndex} 
                  handleTabsChange={handleTabsChange} 
                  category={menuButtonLabel} 
                  title={title} 
                  description={description}
                  address={address}/>
              </TabPanel>
              <TabPanel>
                <JobAdDetailsForm 
                  category={menuButtonLabel}
                  title={title}
                  description={description}
                  price={price}
                  address={address}
                  duration={duration}
                  youngestChildAge={youngestChildAge}
                  toolsProvided={toolsProvided}
                  numberOfRooms={numberOfRooms}
                  handlers={{
                    handleTitleChange,
                    handleDescriptionChange,
                    handlePriceChange,
                    handleAddressChange,
                    handleDurationChange,
                    handleYoungestChildAgeChange,
                    handleToolsProvidedChange,
                    handleNumberOfRoomsChange
                  }}
                />
                <NavigateFormButtons 
                  tabIndex={tabIndex} 
                  handleTabsChange={handleTabsChange} 
                  category={menuButtonLabel} 
                  title={title} 
                  description={description}
                  address={address}/>
              </TabPanel>
              <TabPanel>
                <p>Oh, hello there.</p>
                <NavigateFormButtons 
                  tabIndex={tabIndex} 
                  handleTabsChange={handleTabsChange} 
                  category={menuButtonLabel} 
                  title={title} 
                  description={description}
                  address={address}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Card>
    </Box>
  );
};

export default CreateJobAdForm;