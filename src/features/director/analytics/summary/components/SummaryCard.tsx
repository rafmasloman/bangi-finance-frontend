import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import CurrencyFormatter from '../../../../../shared/components/formatter/CurrencyFormatter';

interface ISummaryCardProps {
  amount?: number;
  title: string;
  icon: ReactNode;
}

const SummaryCard = (props: ISummaryCardProps) => {
  return (
    <Card
      radius={20}
      shadow="xs"
      w={300}
      className=" h-fit py-5 overflow-visible"
      withBorder
    >
      <Stack
        gap={20}
        className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
      >
        <Group justify="space-between">
          <Text className="text-xl font-semibold text-gray-400">
            {props.title}
          </Text>
          <ActionIcon
            variant="light"
            size={40}
            radius={'xl'}
            className="bg-zinc-100 "
          >
            {props.icon}
          </ActionIcon>
        </Group>

        <CurrencyFormatter
          className="text-3xl font-semibold "
          currency="IDR"
          value={props.amount}
        />
      </Stack>
    </Card>
  );
};

export default SummaryCard;
