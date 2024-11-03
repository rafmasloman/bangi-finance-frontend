import { Card, CardProps, Group, Stack, Text } from '@mantine/core';
import CurrencyFormatter from '../../../../shared/components/formatter/CurrencyFormatter';
import { ReactNode } from 'react';

interface IAnalyticsCardPropsType extends CardProps {
  title: string;
  value?: number;
  icon?: ReactNode;
  iconColor?: string;
}

const AnalyticsCard = (props: IAnalyticsCardPropsType) => {
  return (
    <Card
      radius={16}
      shadow="md"
      className=" h-full overflow-visible"
      withBorder
    >
      <Stack
        gap={20}
        className=" text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-[250px]"
      >
        <Group justify="space-between" className="w-full" wrap="nowrap">
          <Text className="text-base xl:text-xl font-semibold text-gray-400">
            {props.title}
          </Text>
          {props.icon}
        </Group>
        <Stack align="start" gap={10}>
          <CurrencyFormatter
            currency="IDR"
            className="text-2xl xl:text-3xl font-semibold "
            value={props.value}
          />
          {props.children}
        </Stack>
      </Stack>
    </Card>
  );
};

export default AnalyticsCard;
