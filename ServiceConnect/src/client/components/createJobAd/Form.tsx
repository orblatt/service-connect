import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Card, Stack, useSteps, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, MenuItem, useToast, Button, Text } from '@chakra-ui/react';
import { JobAd } from 'wasp/entities';
import { createJobAd } from 'wasp/client/operations';

import JobCategoriesDropdown from '../searchbar/JobCategoriesDropdown';
import { jobCategories, defaultJobAd, defaultCityPlaceholder, defaultCategory, routes } from '../../../config';
import JobAdDetailsForm from './JobAdDetailsForm';
import NavigateFormButtons from './NavigateFormButtons';
import SearchResult from '../searchbar/SearchResult';
import { CreateJobAdPayload } from '../../../actions';


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
  const [city, setCity] = useState(defaultCityPlaceholder);
  const [duration, setDuration] = useState(defaultDuration);
  const [youngestChildAge, setYoungestChildAge] = useState(defaultYoungestChildAge);
  const [toolsProvided, setToolsProvided] = useState(defaultToolsProvided);
  const [numberOfRooms, setNumberOfRooms] = useState(defaultNumberOfRooms);
  const [menuButtonLabel, setMenuButtonLabel] = useState(defaultCategory);
  const [jobAdPayload, setJobAdPayload] = useState<CreateJobAdPayload & { isDone: boolean }>( { 
    description, 
    price,
    category: menuButtonLabel,
    city,
    title,
    duration,
    youngestChildAge,
    toolsProvided,
    numberOfRooms,
    isDone,
  });
  const handleJobAdPayloadChange = (field: any, value: any) => {
    setJobAdPayload(prevState => ({ ...prevState, [field]: value }));
  };
  const handleCategoryChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const category = event.currentTarget.textContent as string;
    setMenuButtonLabel(category);
    handleJobAdPayloadChange('category', category);
  }

  const menuItems: React.ReactElement<typeof MenuItem>[] = jobCategories.map(
    (category: string, index) => {
        return <MenuItem 
                  key={index} 
                  onClick={handleCategoryChange}>
                {category}
              </MenuItem>
    }
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    handleJobAdPayloadChange('title', newTitle);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    handleJobAdPayloadChange('description', newDescription);
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    handleJobAdPayloadChange('price', newPrice);
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = event.target.value;
    setCity(newCity);
    handleJobAdPayloadChange('city', newCity);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    handleJobAdPayloadChange('duration', newDuration);
  };

  const handleYoungestChildAgeChange = (newYoungestChildAge: number) => {
    setYoungestChildAge(newYoungestChildAge);
    handleJobAdPayloadChange('youngestChildAge', newYoungestChildAge);
  };

  const handleToolsProvidedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newToolsProvided = event.target.checked;
    setToolsProvided(newToolsProvided);
    handleJobAdPayloadChange('toolsProvided', newToolsProvided);
  };

  const handleNumberOfRoomsChange = (newNumberOfRooms: number) => {
    setNumberOfRooms(newNumberOfRooms);
    handleJobAdPayloadChange('numberOfRooms', newNumberOfRooms);
  };
  
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
        return { ...newObject, youngestChildAge } as CreateJobAdPayload;
      case 'House Keeping':
        return { ...newObject, numberOfRooms } as CreateJobAdPayload;
      case 'Gardening':
        return { ...newObject, toolsProvided } as CreateJobAdPayload;
      default:
        console.error('Error: Invalid category');
        return newObject as CreateJobAdPayload;
    }
  };
  

  async function onSubmit() {
    try {
      const normalizedJobAdPayload: CreateJobAdPayload = normalizeJobAdPayload(jobAdPayload);
      await createJobAd(normalizedJobAdPayload);
      console.log("This is client side", JSON.stringify(normalizedJobAdPayload));
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
                  city={city}
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
                  city={city}
                  duration={duration}
                  youngestChildAge={youngestChildAge}
                  toolsProvided={toolsProvided}
                  numberOfRooms={numberOfRooms}
                  handlers={{
                    handleTitleChange,
                    handleDescriptionChange,
                    handlePriceChange,
                    handleCityChange,
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
                  city={city}
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
                  city={city}
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