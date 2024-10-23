import { NumberInput, NumberInputProps } from '@mantine/core';

type IBaseCurrencyInputPropsType = NumberInputProps;

const BaseCurrencyInput = (props: IBaseCurrencyInputPropsType) => {
  return (
    <NumberInput
      prefix="Rp "
      thousandSeparator="."
      decimalSeparator=","
      {...props}
    />
  );
};

export default BaseCurrencyInput;
