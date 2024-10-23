import { Fieldset, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import ProfitCard from '../../../../features/director/analytics/summary/components/ProfitCard';
import { FaBoxOpen } from 'react-icons/fa';
import { FaCartFlatbed, FaSitemap } from 'react-icons/fa6';

import { RiDiscountPercentFill } from 'react-icons/ri';
import SummaryCard from '../../../../features/director/analytics/summary/components/SummaryCard';
import MasterBalanceCard from '../../../../features/director/analytics/master-data/components/MasterBalanceCard';
import SummaryExpenseCard from '../../../../features/director/analytics/summary/components/SummaryExpenseCard';
import { useParams } from 'react-router-dom';
import { useGetIncomeProfit } from '../../../../api/income/hooks/useGetIncomeProfit';
import { useGetIncomeSummary } from '../../../../api/income/hooks/useGetIncomeSummary';
import { useGetExpenseSummary } from '../../../../api/expense/hooks/useGetExpenseSummary';

const DirectorSummaryPage = () => {
  const { historyId } = useParams();

  const profit = useGetIncomeProfit(historyId);
  const incomeSummary = useGetIncomeSummary(historyId);
  const expenseSummary = useGetExpenseSummary(historyId);

  return (
    <Stack gap={40}>
      <Group wrap="nowrap">
        <ProfitCard
          amount={profit.data?.amount}
          percent={profit.data?.percent}
        />
      </Group>

      <Fieldset
        legend="Sales"
        classNames={{
          legend: `text-xl text-[#B5C99A] font-semibold`,
          root: `border-[#B5C99A] border rounded-xl`,
        }}
      >
        {/* <Group className="border-l-[6px] border-primary">
          <Text className="text-2xl font-semibold pl-3">Sales</Text>
          
        </Group> */}

        <Group wrap="nowrap" className="overflow-x-auto overflow-y-hidden py-5">
          <SummaryCard
            amount={incomeSummary.data?.itemSales}
            title="Item Sales"
            icon={<FaCartFlatbed className="text-xl text-emerald-400" />}
          />

          <SummaryCard
            amount={incomeSummary.data?.totalDiscount}
            title="Total Disc"
            icon={<RiDiscountPercentFill className="text-2xl text-[#FFA7B7]" />}
          />

          <SummaryCard
            amount={incomeSummary.data?.totalFoc}
            title="Total Foc"
            icon={<FaSitemap className="text-2xl text-orange-300" />}
          />

          <SummaryCard
            amount={incomeSummary.data?.totalSales}
            title="Total Sales"
            icon={<FaBoxOpen className="text-2xl text-gray-600" />}
          />
        </Group>
      </Fieldset>

      <Stack
        gap={25}
        className="border shadow-sm border-gray-300 rounded-3xl h-[420px] overflow-y-auto scrollbar-hide md:h-full px-5 pt-5 pb-10"
      >
        <Group className="border-l-[6px] border-primary">
          <Text className="text-2xl font-semibold pl-3">Pengeluaran</Text>
        </Group>

        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <MasterBalanceCard
              title="Total Pengeluaran"
              value={expenseSummary.data?.totalExpense}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <SummaryExpenseCard
                amount={expenseSummary.data?.rawMaterials}
                title="Bahan Baku"
              />
              <SummaryExpenseCard
                amount={expenseSummary.data?.operational}
                title="Operasional"
              />
              <SummaryExpenseCard
                amount={expenseSummary.data?.payrollEmployee}
                title="Gaji Karyawan"
              />
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default DirectorSummaryPage;
