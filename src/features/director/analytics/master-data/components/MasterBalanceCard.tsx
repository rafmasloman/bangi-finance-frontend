import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core';
import CurrencyFormatter from '../../../../../shared/components/formatter/CurrencyFormatter';
import { ReactNode } from 'react';

interface IMasterBalanceCardProps {
  title?: string;
  value?: number;
  description?: number;
  icon?: ReactNode;
}

const MasterBalanceCard = (props: IMasterBalanceCardProps) => {
  return (
    <Card
      radius={25}
      shadow="xs"
      className="w-full h-fit py-5 relative bg-black_primary overflow-visible"
    >
      <div className="w-5/6  h-10 absolute -z-30 -bottom-2 left-1/2 transform -translate-x-1/2 bg-neutral-400/80 rounded-lg"></div>
      <div className="w-3/4  h-10 absolute -z-40 -bottom-3.5 left-1/2 transform -translate-x-1/2 bg-neutral-300/70 rounded-lg"></div>

      <Stack gap={20}>
        <Group justify="space-between">
          <Text className="text-lg font-semibold text-white">
            {props.title}
          </Text>
          <ActionIcon
            variant="light"
            size={40}
            radius={'xl'}
            className="bg-primary "
          >
            {props.icon}
          </ActionIcon>
        </Group>
        <Stack gap={10}>
          <CurrencyFormatter
            className="text-3xl text-white font-semibold "
            currency="IDR"
            value={props.value}
          />

          <Text className="text-base text-gray-400 font-medium ">
            Jumlah Supplier : {props.description ?? 0}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default MasterBalanceCard;
