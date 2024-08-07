import { useState } from 'react';
import { AuthUser } from 'wasp/auth'
import { ProviderLayout } from './MainLayout'
import { Button, Card, CardBody, CardHeader, Heading, useToast } from '@chakra-ui/react';
import { deleteSearchProfiles } from 'wasp/client/operations'
import { useForm } from 'react-hook-form'


export const SettingsPage = ({ user }: { user: AuthUser }) => {
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false)
  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit() {
    try {
      await deleteSearchProfiles({});
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Search Profiles deleted successfully");
          toast({
            title: 'Unsubscribed successfully.',
            description: "You will no longer receive alerts to your email.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setIsSubmittedOnce(true)
        }, 1000); // Delay in milliseconds
      });
    } catch (err: any) {
      console.log('Error: ' + err.message);
      toast({
        title: 'Error',
        description: `Failed to unsubscribe: ${err.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (

    <ProviderLayout user={user}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card shadow='lg' variant='elevated'>
                <CardHeader>
                    <Heading>Settings</Heading>
                </CardHeader>
                <CardBody>
                  <Button
                    mr="5%"
                    colorScheme="red"
                    variant="solid"
                    isLoading={isSubmitting}
                    isDisabled={isSubmittedOnce}
                    type='submit'
                  >
                    Unsubscribe All Alerts
                  </Button>
                </CardBody>
        </Card>
        </form>
    </ProviderLayout>
  );
};