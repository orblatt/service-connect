import { useToast, UseToastOptions } from "@chakra-ui/react"

const ComingSoon = (toast: any) => {
    // const toast = useToast()
    toast({
       title: 'Coming Soon',
       description: "We're workig on it",
       status: 'error',
       duration: 3000,
       isClosable: true,
     })
}

export default ComingSoon;