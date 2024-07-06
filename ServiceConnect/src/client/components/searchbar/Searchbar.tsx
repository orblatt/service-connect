import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Box, Stack, Card, CardHeader, CardBody, Heading, Flex, MenuItem, Button, useToast } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import { JobAd } from 'wasp/entities';
import { AuthUser } from 'wasp/auth';
import { useQuery, getFilteredJobAds, createSearchProfile } from 'wasp/client/operations'
import SearchProfileButton from './SearchProfileButton';
import JobCategoriesDropdown from './JobCategoriesDropdown';
import IsDoneSwitch from './IsDoneSwitch';
import SearchResults from './SearchResults';
import { PriceRangeSlider, PriceProps } from './PriceRangeSlider';
import { DurationComponents, DurationProps } from './durationToPrice/DurationComponents';
import { JobAdFilters } from '../../../queries';
import { cityOptions, defaultCategory, defaultCityPlaceholder, jobCategories, prices, type Interval, duration as durationConfig } from '../../../config';
import CityDropdown from '../createJobAd/CityDropdown';



const Searchbar = ({ user }: { user: AuthUser }) => {
    const { defaultMinPrice, defaultMaxPrice } = prices;
    const [minPrice, setMinPrice] = useState<PriceProps>({valueAsString: defaultMinPrice.toString(), valueAsNumber: defaultMinPrice});
    const [maxPrice, setMaxPrice] = useState<PriceProps>({valueAsString: defaultMaxPrice.toString(), valueAsNumber: defaultMaxPrice});
    const [minDuration, setMinDuration] = useState<DurationProps>({valueAsString: durationConfig.defaultMin.toString(), valueAsNumber: durationConfig.defaultMin});
    const [maxDuration, setMaxDuration] = useState<DurationProps>({valueAsString: durationConfig.defaultMax.toString(), valueAsNumber: durationConfig.defaultMax});
    const [exactDuration, setExactDuration] = useState<DurationProps>({valueAsString: durationConfig.defaultExact.toString(), valueAsNumber: durationConfig.defaultExact});
    const [isDone, setIsDone] = useState(false);
    const [isDurationExact, setIsDurationExact] = useState(false);
    const [interval, setInterval] = useState<Interval | 'Interval'>('Interval');
    const [menuButtonLabel, setMenuButtonLabel] = useState(defaultCategory);
    const [city, setCity] = useState(defaultCityPlaceholder);
    const userEmail = user?.auth?.identities[0]?.providerUserId;
    const emails = userEmail ? [userEmail] : [];
    const searchProfile = useMemo(() => ({
        minPrice: minPrice.valueAsNumber,
        maxPrice: maxPrice.valueAsNumber,
        isDone,
        category: menuButtonLabel,
        interval,
        emails,
        city,
        minDuration: minDuration.valueAsNumber,
        maxDuration: maxDuration.valueAsNumber,
        exactDuration: exactDuration.valueAsNumber,
        isDurationExact
      }), [minPrice, maxPrice, isDone, menuButtonLabel, interval, emails, city, minDuration, maxDuration, exactDuration, isDurationExact]);

    const menuItems: React.ReactElement<typeof MenuItem>[] = jobCategories.map(
        (category: string, index) => {
            return <MenuItem 
                    key={index} 
                    onClick={() => setMenuButtonLabel(category)}>
                    {category}
                </MenuItem>
        }
    );

    const cityMenuItems: React.ReactElement[] = [...cityOptions, 'Any city'].map(
      (city: string, index) => {
          return <MenuItem 
                  key={index} 
                  onClick={() => setCity(city)}>
                  {city}
              </MenuItem>
      }
  );


    const { data: jobAds, isLoading, error } = useQuery(
        getFilteredJobAds, 
        { 
          minPrice: minPrice.valueAsNumber, 
          maxPrice: maxPrice.valueAsNumber, 
          isDone, 
          category: menuButtonLabel, 
          city, 
          minDuration: minDuration.valueAsNumber, 
          maxDuration: maxDuration.valueAsNumber, 
          exactDuration: exactDuration.valueAsNumber, 
          isDurationExact } as JobAdFilters
      );


    const handleMinChange = (valueAsString: string, valueAsNumber: number) => {
        const newMin = valueAsNumber;
        if (newMin <= maxPrice.valueAsNumber) { 
            setMinPrice({ valueAsString, valueAsNumber});
        }
    };

    const handleMaxChange = (valueAsString: string, valueAsNumber: number) => {
        const newMax = valueAsNumber;
        if (newMax >= minPrice.valueAsNumber) { 
            setMaxPrice({ valueAsString, valueAsNumber});
        }
     };

     const handleMinDurationChange = (valueAsString: string, valueAsNumber: number) => {
      const newMin = valueAsNumber;
      if (newMin <= maxDuration.valueAsNumber) { 
          setMinDuration({ valueAsString, valueAsNumber});
      }
    };

    const handleMaxDurationChange = (valueAsString: string, valueAsNumber: number) => {
        const newMax = valueAsNumber;
        if (newMax >= durationConfig.min) { 
            setMaxDuration({ valueAsString, valueAsNumber});
        }
    };

    const handleExactDurationChange = (valueAsString: string, valueAsNumber: number) => {
      const newExactDuration = valueAsNumber;
      if (newExactDuration <= durationConfig.max && newExactDuration >= durationConfig.min) { 
          setExactDuration({ valueAsString, valueAsNumber});
      }
    };

    const handleIsDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newIsDone = !event.target.checked
      setIsDone(newIsDone);
    };

    const handleIsDurationExactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newIsDurationExact = !event.target.checked
      setIsDurationExact(newIsDurationExact);
    };

    const handleIntervalChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newInterval = event.currentTarget.textContent! as Interval | 'Interval';
        setInterval(newInterval);
      }

      // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      //   const newCity = event.target.value;
      //   setCity(newCity);
      // };

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    const toast = useToast()
    
    async function onSubmit() {
        try {
          await createSearchProfile(searchProfile);
          // Return a new Promise that resolves after a second delay
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve("Search Profile created successfully");
              toast({
                title: 'Alert subscribed successfully.',
                description: "We've subscribed you to get alerts with similar job ads according to current filters.",
                status: 'success',
                duration: 5500,
                isClosable: true,
              })
            }, 1000); // Delay in milliseconds
          });
        } catch (err: any) {
          console.log('Error: ' + err.message);
        }
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Stack>
                    <Card key='md' size='md' variant='elevated'>
                    <CardHeader mb={0}>
                        <Heading size='md'><Flex> Search &nbsp; <FiSearch/></Flex></Heading>
                    </CardHeader>
                    <CardBody mt={0}>
                        <Flex>
                            <Stack align='center' direction='row' spacing={3}>
                              <JobCategoriesDropdown menuButtonLabel={menuButtonLabel} menuItems={menuItems}/>
                              <CityDropdown menuButtonLabel={city} menuItems={cityMenuItems}/>
                            </Stack>
                        </Flex>
                        <br/>
                        <IsDoneSwitch isDone={isDone} handleIsDoneChange={handleIsDoneChange}/>
                        <DurationComponents
                            minDuration={minDuration}
                            maxDuration={maxDuration}
                            exactDuration={exactDuration}
                            handleMinDurationChange={handleMinDurationChange}
                            handleMaxDurationChange={handleMaxDurationChange}
                            handleExactDurationChange={handleExactDurationChange}
                            isDurationExact={isDurationExact}
                            handleIsDurationExactChange={handleIsDurationExactChange}
                        />
                        <PriceRangeSlider 
                            minPrice={minPrice} 
                            maxPrice={maxPrice} 
                            handleMinChange={handleMinChange} 
                            handleMaxChange={handleMaxChange} 
                        />
                        <Box h={3}></Box>
                        <SearchProfileButton searchProfile={searchProfile} handleIntervalChange={handleIntervalChange} isSubmitting={isSubmitting}/>                    
                    </CardBody>
                    </Card>
                </Stack>
                <Box p={2} ></Box>
                {jobAds && <SearchResults jobAds={jobAds as JobAd[]} user={user}/>}
                {/* {isLoading && 'Loading...'} */}
                {error && 'Error: ' + error}
            </Box>
        </form>
    );
}

export default Searchbar;