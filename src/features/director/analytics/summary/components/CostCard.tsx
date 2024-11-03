import { Card, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface ICostCardProps {
  percent?: number;
  icon?: ReactNode;
  label: string;
}

const CostCard = (props: ICostCardProps) => {
  return (
    <Card
      radius={25}
      shadow="xs"
      w={300}
      className=" h-fit py-5 overflow-visible "
      withBorder
    >
      <Stack
        gap={25}
        className="w-[240px] md:w-[270px] lg:w-[300px] xl:w-full  "
      >
        <Group gap={10} justify="space-between" wrap="nowrap">
          <Text className="text-xl font-semibold text-gray-400">
            {props.label}
          </Text>
          {props.icon}
        </Group>

        <Stack gap={12}>
          <Text className="text-3xl font-semibold ">{props.percent}%</Text>

          <Text className="text-sm md:text-base text-gray-400 font-medium">
            {props.label} anda sebanyak{' '}
            <span className="text-green-600 font-semibold">
              {props.percent}%
            </span>
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CostCard;
