import { Group, Text } from '@mantine/core';

interface IScrollBarCardBodyProps {
  label: string;
  value: string | number;
}

const ScrollBarCardBody = (props: IScrollBarCardBodyProps) => {
  return (
    <Group
      justify="space-around"
      className="w-full bg-gray-100 rounded-lg py-2.5"
    >
      <Text className="font-medium text-gray-700">{props.label}</Text>
      <Text className="font-medium">{props.value}</Text>
    </Group>
  );
};

export default ScrollBarCardBody;
