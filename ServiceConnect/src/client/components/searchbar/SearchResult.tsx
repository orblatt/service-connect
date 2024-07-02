import { useEffect, useState } from 'react'
import { Card, Divider, CardBody, CardFooter, Heading, Text, Image, Stack, ButtonGroup, Button, useToast } from "@chakra-ui/react"
import { JobAd } from 'wasp/entities';
import { updateJobAd, updateJobAdProvider, getUserById, useQuery } from 'wasp/client/operations'


function useUserDetails(userId: number, userType: 'Provider' | 'Owner') {
  const [username, setUsername] = useState(`No ${userType}`);
  const { data: user, error } = useQuery(getUserById, { userId }, [userId]);

  useEffect(() => {
    if (error) {
      setUsername(`No ${userType} (Error)`);
    } else if (!user) {
      setUsername(`No ${userType}`);
    } else {
      const email = user?.auth?.identities[0]?.providerUserId;
      setUsername(email ? email.split('@')[0] : '');
    }
  }, [user, error, userType]);

  return username;
}

const SearchResult = ({ jobAd, isPreview } : { jobAd: JobAd, isPreview: boolean }) => {
    const { description, price, isDone, ownerId, providerId, title, duration, youngestChildAge, toolsProvided, numberOfRooms } = jobAd;
    const ownerUsername = ownerId ? useUserDetails(ownerId, 'Owner') : 'No Owner';
    const providerUsername = ownerId ? useUserDetails(providerId, 'Provider') : 'No Provider';
    const toast = useToast()

    const handleProviderChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!jobAd.id) {
          toast({
            title: 'Preview',
            description: "Provider cannot be assigned to the ad during preview.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
          return;
        }
        try {
          const result = await updateJobAdProvider({ id: jobAd.id })
          toast({
            title: 'Provider assigned.',
            description: "We've assigned/unassigned you to this ad.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } catch (error: any) {
          toast({
            title: 'Provider not assigned.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }

      const handleIsDoneChange = async (event: React.MouseEvent<HTMLButtonElement>) => { //TODO: fix it
        event.preventDefault()
        if (!jobAd.id) {
          toast({
            title: 'Preview',
            description: "Create the ad before marking it as done",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
          return;
        }

        try {
          const result: { count: number } = await updateJobAd({
            id: jobAd.id,
            isDone: !isDone,
          })
          if (result.count > 0) {
            toast({
              title: 'Status updated',
              description: "We've updated the status of this ad.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          } else {
            toast({
              title: 'Update your own ads',
              description: "You are only allowed to modify ads that you have created.",
              status: 'warning',
              duration: 3000,
              isClosable: true,
            })
          }
        } catch (error: any) {
          window.alert('Error while updating job Ad status: ' + error.message)
        }
      }

    let content = null;
    if (youngestChildAge) {
      content = <><b>Youngest Child:</b> &nbsp;{youngestChildAge} years old</>;
    } else if (numberOfRooms) {
      content = <><b>Rooms:</b> &nbsp;{numberOfRooms}</>;
    } else if (typeof toolsProvided === 'boolean') {
      content = <><b>Tools Provided:</b> &nbsp;{toolsProvided === true ? 'Yes' : 'No'}</>;
    }

    return (
        <Card maxW='sm' shadow='xl'>
        <CardBody>
            <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text>
                {description}<br/><br/>
                {!isPreview && (<div><b>Owner:</b> &nbsp;{ownerUsername}<br/></div>)}
                <b>Provider:</b> &nbsp;{providerUsername}<br/>
                {/* <b>ProviderId:</b> &nbsp;{providerId}<br/> */}
                <b>Duration:</b> &nbsp;{duration} hours<br/>
                {content}
            </Text>
            <Text color='purple.600' fontSize='2xl'>
                ${price}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='purple' onClick={handleProviderChange}>
                Assign Me
            </Button>
            <Button variant='ghost' colorScheme='purple' onClick={handleIsDoneChange}>
                Mark Done
            </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
    )
}

export default SearchResult;