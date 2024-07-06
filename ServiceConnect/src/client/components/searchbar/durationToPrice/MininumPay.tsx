import { FormLabel } from "@chakra-ui/react";

interface MinimumPayProps {
    minDuration: number;
    hourlyRate: number;
}

const MinimumPay: React.FC<MinimumPayProps> = ({minDuration, hourlyRate}) => {
  return (
    <FormLabel>Minimum Pay (₪): {minDuration * hourlyRate}</FormLabel>
  );
}

export default MinimumPay;