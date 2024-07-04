import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Box,
  } from '@chakra-ui/react'
  import {
    LuBellPlus,
  } from 'react-icons/lu'
  import { FaChevronDown } from "react-icons/fa";
import { Interval, defaultInterval, defaultIntervals } from '../../../config';
import React from 'react';
import { DropdownButton } from './DropdownButton';
import { CreateSearchProfilePayload } from '../../../actions';

interface SearchProfileButtonProps {
    searchProfile: CreateSearchProfilePayload;
    handleIntervalChange: (event: React.MouseEvent<HTMLButtonElement>) => void   
    isSubmitting: boolean;
}
  const SearchProfileButton: React.FC<SearchProfileButtonProps> = ({searchProfile, handleIntervalChange,isSubmitting}) => {
    const { interval } = searchProfile;
    const menuItems: React.ReactElement<Interval>[] = defaultIntervals.map(
        (interval: Interval, index) => {
            return <MenuItem 
                      value={interval.toLowerCase()}
                      key={index} 
                      onClick={handleIntervalChange}>
                    {interval}
                  </MenuItem>
        }
      );
    return (
        <Popover>
        <PopoverTrigger>
          <Button variant='outline' color='purple.500'>
            <LuBellPlus/>&nbsp; Set Alert
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Choose an interval</PopoverHeader>
          <Box p={3}>
          <Flex>
          <DropdownButton menuButtonLabel={interval} menuItems={menuItems} />
          {/* <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown/>} variant='outline' color='teal'>
                Interval
            </MenuButton>
            <MenuList>
                
            </MenuList>
            </Menu> */}
            
            <Box w={3}></Box>
            <Button
                px={4}
                fontSize={'sm'}
                rounded={'full'}
                bg={'purple.500'}
                color={'purple.50'}
                _hover={{
                bg: 'purple.600',
                }}
                isDisabled={interval === defaultInterval}
                isLoading={isSubmitting}
                type='submit'
            >
            Submit
            </Button>
            </Flex>
            </Box>
        </PopoverContent>
      </Popover>
    )
  }

    export default SearchProfileButton