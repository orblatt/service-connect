import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Card, Stack, useSteps, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, MenuItem, useToast, Button, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { JobAd } from 'wasp/entities';
import JobCategoriesDropdown from '../searchbar/JobCategoriesDropdown';
import { jobCategories, defaultJobAd, defaultCityPlaceholder, defaultCategory, routes } from '../../../config';
import JobAdDetailsForm from './JobAdDetailsForm';
import NavigateFormButtons from './NavigateFormButtons';
import SearchResult from '../searchbar/SearchResult';
import { CreateJobAdPayload } from '../../../actions';
import { createJobAd } from 'wasp/client/operations'
import { LuBellPlus } from "react-icons/lu";

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
  const [isDone, setIsDone] = useState(false);
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const [price, setPrice] = useState<number>(defaultJobAd.price);
  const [address, setAddress] = useState(defaultCityPlaceholder);
  const [duration, setDuration] = useState(defaultDuration);
  const [youngestChildAge, setYoungestChildAge] = useState(defaultYoungestChildAge);
  const [toolsProvided, setToolsProvided] = useState(defaultToolsProvided);
  const [numberOfRooms, setNumberOfRooms] = useState(defaultNumberOfRooms);
  const [jobAdPayload, setJobAdPayload] = useState<CreateJobAdPayload & { isDone: boolean }>( { 
    description, 
    price, 
    isDone,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    const jobAdPayload: CreateJobAdPayload & { isDone: boolean } = { description: event.target.value, price, isDone }
    setJobAdPayload(jobAdPayload)
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    const jobAdPayload: CreateJobAdPayload & { isDone: boolean } = { description, price: newPrice, isDone }
    setJobAdPayload(jobAdPayload)
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

  const [menuButtonLabel, setMenuButtonLabel] = useState(defaultCategory);
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

  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const normalizeJobAdPayload = (jobAdPayload: CreateJobAdPayload & { isDone: boolean }) => {
    const { isDone, youngestChildAge, toolsProvided, numberOfRooms, ...newObject } = jobAdPayload;
  
    switch (newObject.category) {
      case 'Babysitting':
        return { ...newObject, youngestChildAge };
      case 'House Keeping':
        return { ...newObject, numberOfRooms };
      case 'Gardening':
        return { ...newObject, toolsProvided };
    }
  };
  

  async function onSubmit() {
    try {
      const normalizedJobAdPayload: CreateJobAdPayload = normalizeJobAdPayload(jobAdPayload);
      // await createJobAd(normalizedJobAdPayload);
      console.log(JSON.stringify(normalizedJobAdPayload));
      setIsSubmittedOnce(true);
      // Return a new Promise that resolves after a second delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Job ad created successfully");
          toast({
            title: 'Ad created.',
            description: "We've created your ad for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          handleTabsChange(tabIndex + 1)
        }, 1000); // Delay in milliseconds
      });
    } catch (err: any) {
      console.log('Error: ' + err.message);
    }
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  address={address}
                  isSubmitting={isSubmitting}
                  isSubmittedOnce={isSubmittedOnce}
                />
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
                  address={address}
                  isSubmitting={isSubmitting}
                  isSubmittedOnce={isSubmittedOnce}
                  />
              </TabPanel>
              <TabPanel>
                <SearchResult jobAd={jobAdPayload as JobAd} />
                <NavigateFormButtons 
                  tabIndex={tabIndex} 
                  handleTabsChange={handleTabsChange} 
                  category={menuButtonLabel} 
                  title={title} 
                  description={description}
                  address={address}
                  isSubmitting={isSubmitting}
                  isSubmittedOnce={isSubmittedOnce}
                />
              </TabPanel>
              <TabPanel>
                <Text paddingY='5'>Congratulations! Your ad was created successfuly</Text>
                <ChakraLink as={ReactRouterLink} to={routes.home} style={{ textDecoration: 'none' }}>
                <Button
                  colorScheme="purple"
                  variant='solid'
                >
                  Return to homepage
                </Button>
                </ChakraLink>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Card>
    </Box>
    </form>
  );
};

export default CreateJobAdForm;