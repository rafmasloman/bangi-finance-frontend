import { NumberFormatter, NumberFormatterProps } from '@mantine/core';

interface ICurrencyFormatterPropsType extends NumberFormatterProps {
  currency: 'IDR' | 'USD';
}

const CurrencyFormatter = (props: ICurrencyFormatterPropsType) => {
  const generatePrefix = () => {
    let currentPrefix = '';

    switch (props.currency) {
      case 'IDR':
        currentPrefix = 'Rp ';
        break;

      case 'USD':
        currentPrefix = '$ ';
        break;

      default:
        break;
    }

    return currentPrefix;
  };

  return (
    <NumberFormatter
      prefix={generatePrefix().toString()}
      thousandSeparator="."
      decimalSeparator=","
      {...props}
    />
  );
};

export default CurrencyFormatter;
