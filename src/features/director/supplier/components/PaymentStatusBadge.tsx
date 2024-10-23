import { Badge, BadgeProps } from '@mantine/core';

interface IPaymentStatusBadgeProps extends BadgeProps {
  isPay: boolean;
}

const PaymentStatusBadge = (props: IPaymentStatusBadgeProps) => {
  return (
    <Badge
      variant="light"
      color={props.isPay ? 'green' : 'pink'}
      {...props}
      classNames={{
        label: `text-nowrap`,
        root: `w-fit`,
      }}
    >
      {props.children}
    </Badge>
  );
};

export default PaymentStatusBadge;
