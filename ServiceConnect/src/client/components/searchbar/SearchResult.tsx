import { Card, Divider, CardBody, CardFooter, Heading, Text, Image, Stack, ButtonGroup, Button, useToast } from "@chakra-ui/react"
import { JobAd } from 'wasp/entities';
import { updateJobAd, updateJobAdProvider } from 'wasp/client/operations'
import { jobImages, type JobCategory } from '../../../config'
import { useUserDetails } from '../../../utils'
import { AuthUser } from 'wasp/auth'

const SearchResult = ({ jobAd, isPreview, user } : { jobAd: JobAd, isPreview: boolean, user: AuthUser }) => {
    const { category, description, price, isDone, ownerId, providerId, title, city, duration, youngestChildAge, toolsProvided, numberOfRooms } = jobAd;
    const ownerUsername = ownerId ? useUserDetails(ownerId, 'Owner').username : 'No Owner';
    const providerUsername = ownerId ? useUserDetails(providerId, 'Provider').username : 'No Provider';
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
    if (youngestChildAge && category === 'Babysitting') {
      const age = youngestChildAge === 1 ? 'year' : 'years';
      content = <><b>Youngest Child:</b> &nbsp;{youngestChildAge} {age} old</>;
    } else if (numberOfRooms && category === 'House Keeping') {
      content = <><b>Rooms:</b> &nbsp;{numberOfRooms}</>;
    } else if (typeof toolsProvided === 'boolean' && category === 'Gardening') {
      content = <><b>Tools Provided:</b> &nbsp;{toolsProvided === true ? 'Yes' : 'No'}</>;
    }
    const imageUrl = jobImages[category as JobCategory]?.src || '';
    const imageAlt = jobImages[category as JobCategory]?.alt || '';

    return (
        <Card maxW='sm' shadow='xl'
        >
        <CardBody >
            <Image
            src={imageUrl}
            alt={imageAlt}
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text as='div'>
                {description}<br/><br/>

                {!isPreview && (<div><b>Owner:</b> &nbsp;{ownerUsername}<br/></div>)}
                <b>Provider:</b> &nbsp;{providerUsername}<br/>
                <b>Location:</b> &nbsp;{city}<br/>
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
            <Button variant='solid' colorScheme='purple' onClick={handleProviderChange} isDisabled={user.id === ownerId || providerId && providerId !== user.id}>
            {
              providerId && providerId !== user.id
              ? 'Already Assigned'
              : providerId
              ? 'Unassign Me'
              : 'Assign Me'
            }
            </Button>
            <Button variant='outline' colorScheme='purple' onClick={handleIsDoneChange}>
                {!isDone ? 'Done' : 'Undone'}
            </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
    )
}

export default SearchResult;