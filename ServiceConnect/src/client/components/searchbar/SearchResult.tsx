import { ChangeEvent, useState } from 'react'
import { Card, Divider, CardBody, CardFooter, Heading, Text, Image, Stack, ButtonGroup, Button } from "@chakra-ui/react"
import { JobAd } from 'wasp/entities';
import { updateJobAd, updateJobAdProvider } from 'wasp/client/operations'


const SearchResult = ({ jobAd } : { jobAd: JobAd }) => {
    const { description, price, isDone, ownerId, providerId } = jobAd;
    const [refresh, setRefresh] = useState(false);

    const handleProviderChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
          await updateJobAdProvider({ id: jobAd.id })
        } catch (error: any) {
          window.alert('Error while updating job ad provider: ' + error.message)
        }
      }

      const handleIsDoneChange = async (event: React.MouseEvent<HTMLButtonElement>) => { //TODO: fix it
        event.preventDefault()
        try {
          await updateJobAd({
            id: jobAd.id,
            isDone: !isDone,
          })
          setRefresh(!refresh); // Toggle state to force re-render
        } catch (error: any) {
          window.alert('Error while updating job Ad status: ' + error.message)
        }
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
            <Heading size='md'>Living room Sofa</Heading>
            <Text>
                {description}<br/><br/><b>Provider:</b> &nbsp;{providerId ? providerId : 'No Provider'}
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