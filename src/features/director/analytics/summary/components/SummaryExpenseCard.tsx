import { Card, Group, Text } from '@mantine/core';
import CurrencyFormatter from '../../../../../shared/components/formatter/CurrencyFormatter';

interface IMastarDataCardProps {
  title: string;
  amount?: number;
}

const SummaryExpenseCard = (props: IMastarDataCardProps) => {
  return (
    <Card
      withBorder
      shadow="xs"
      bg={'white'}
      radius={'md'}
      classNames={{
        root: `w-full h-fit text-nowrap overflow-visible  border-[#B5C99A]  shadow-[#B5C99A] shadow-[5px_5px_0_0]`,
        section: `px-4 py-2 `,
      }}
    >
      <Card.Section>
        <Group justify="space-between" wrap="nowrap" className="w-full ">
          <Text className="text-base text-neutral-400 font-medium">
            {props.title} :
          </Text>

          <CurrencyFormatter
            currency="IDR"
            value={props.amount}
            className="text-lg font-semibold"
          />
        </Group>
      </Card.Section>
    </Card>
  );
};

export default SummaryExpenseCard;
