import { Card, Group, Stack, Text } from '@mantine/core';
import MasterCardIL from '../../../../assets/MasterCardIL';
import { FcSimCardChip } from 'react-icons/fc';
import { SiVisa } from 'react-icons/si';
import CurrencyFormatter from '../../../../shared/components/formatter/CurrencyFormatter';

interface IBalanceCardPropsType {
  month?: string;
  value?: number;
}

const BalanceCard = (props: IBalanceCardPropsType) => {
  return (
    <Card
      radius={24}
      //   shadow="lg"
      classNames={{
        root: `h-full md:shadow-none shadow-[6px_6px_2px_1px] shadow-stone-400 relative bg-black_primary overflow-visible`,
      }}
    >
      <div className="w-5/6  h-10 absolute -z-10  -bottom-2 left-1/2 transform -translate-x-1/2 bg-neutral-400 rounded-lg"></div>
      <div className="w-3/4  h-10 absolute  -z-20 -bottom-3.5 left-1/2 transform -translate-x-1/2 bg-neutral-300 rounded-lg"></div>

      <Stack
        justify="space-between"
        className="w-[230px] md:w-[180px] lg:w-[200px] xl:w-[250px]"
      >
        <Group justify="space-between" wrap="nowrap" align="center">
          <FcSimCardChip className="text-2xl xl:text-3xl" />
          <SiVisa className="text-white text-3xl xl:text-5xl" />
        </Group>

        <CurrencyFormatter
          value={props.value}
          className="text-2xl xl:text-3xl text-white font-semibold"
          currency="IDR"
        />

        <Group justify="space-between">
          <Text className="text-sm  text-gray-400">Saldo {props.month} </Text>

          <MasterCardIL width={40} height={30} />
        </Group>
      </Stack>
    </Card>
  );
};

export default BalanceCard;
