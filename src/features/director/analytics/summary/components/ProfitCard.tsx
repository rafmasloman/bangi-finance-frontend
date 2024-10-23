import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import CurrencyFormatter from '../../../../../shared/components/formatter/CurrencyFormatter';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';

interface IProfitCardProps {
  amount?: number;
  percent?: number;
}

const ProfitCard = (props: IProfitCardProps) => {
  return (
    <Card
      radius={25}
      shadow="xs"
      w={300}
      className=" h-fit py-5 overflow-visible "
      withBorder
    >
      <Stack gap={25} className="">
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10}>
            <BiSolidBadgeDollar className="text-3xl text-yellow-500" />
            <Text className="text-xl font-semibold text-gray-400">Profit</Text>
          </Group>
          <Badge
            variant="light"
            color="green"
            size="lg"
            rightSection={<IoStatsChart />}
          >
            {props.percent}%
          </Badge>
        </Group>
        <Stack gap={12}>
          <CurrencyFormatter
            className="text-3xl font-semibold "
            currency="IDR"
            value={props.amount}
          />

          <Text className="text-sm text-gray-400 font-medium">
            Profit anda sebanyak{' '}
            <span className="text-green-600 font-semibold">
              {props.percent}%
            </span>
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfitCard;
