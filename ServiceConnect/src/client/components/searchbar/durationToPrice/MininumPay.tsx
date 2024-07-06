import { Flex, FormLabel } from "@chakra-ui/react";

interface MinimumPayProps {
    minDuration: number;
    hourlyRate: number;
}

const MinimumPay: React.FC<MinimumPayProps> = ({minDuration, hourlyRate}) => {
  return (
    <Flex>
    <FormLabel>Minimum Pay (₪): </FormLabel>
      <FormLabel color='purple.600' fontSize='2xl'>
                ₪{minDuration * hourlyRate}
      </FormLabel>
      </Flex>
    
  );
}

export default MinimumPay;