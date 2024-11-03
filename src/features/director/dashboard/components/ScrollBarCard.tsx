import { Card, CardProps, Divider, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import ScrollBarCardBody from './ScrollBarCardBody';

interface IScrollBarCardPropsType extends CardProps {
  description: string;
  label: string;
  title: string;
  icon?: ReactNode;
  data: { label: string; value: string | number }[];
}

const ScrollBarCard = (props: IScrollBarCardPropsType) => {
  return (
    <Card radius={'lg'} shadow="xs" {...props}>
      <Stack gap={20} className="">
        <Group justify="space-between" align="start">
          <Stack align="start" gap={10}>
            <Text className="text-xl text-black_primary font-semibold">
              {props.title}
            </Text>
          </Stack>
          {props.icon}
        </Group>

        <Group justify="space-between" align="center">
          <Stack className="w-full">
            <Stack gap={10}>
              <Text className="text-base font-medium ">
                {props.description}
              </Text>
              <Text className="text-4xl font-bold ">{props.label}</Text>
            </Stack>

            <Divider />

            <Stack
              gap={20}
              className="overflow-scroll scrollbar-hide h-[350px] "
            >
              <Text className="font-medium">Jumlah Total Per Kategori : </Text>
              {props.data.map((ctx, index) => {
                return (
                  <ScrollBarCardBody
                    key={index}
                    label={ctx.label}
                    value={ctx.value}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default ScrollBarCard;
