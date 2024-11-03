import {
  ActionIcon,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import MasterDataCard from '../../../../features/director/analytics/master-data/components/MasterDataCard';
import MasterBalanceCard from '../../../../features/director/analytics/master-data/components/MasterBalanceCard';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoFileTrayFull } from 'react-icons/io5';
import { HiReceiptTax } from 'react-icons/hi';
import { useGetExpenseCategoryAmount } from '../../../../api/expense/hooks/useGetExpenseCategoryAmount';
import { useParams } from 'react-router-dom';
import { useGetDetailHistory } from '../../../../api/history/hooks/useGetHistoryDetail';
import CurrencyFormatter from '../../../../shared/components/formatter/CurrencyFormatter';
import { PiAlignBottomBold } from 'react-icons/pi';

const DirectorMasterData = () => {
  const { historyId } = useParams();
  const totalExpenseByCategory = useGetExpenseCategoryAmount(
    'SALES,PPN',
    historyId,
  );

  const historyDetail = useGetDetailHistory(historyId, !!historyId);

  return (
    <Stack gap={30}>
      <Text className="text-2xl font-semibold">
        {historyDetail.data?.title}
      </Text>
      <Group
        wrap="nowrap"
        className="w-full overflow-scroll no-scrollbar scrollbar-hide"
      >
        {/* <Card
          radius={25}
          shadow=""
          w={300}
          className=" h-fit py-5 overflow-visible border border-neutral-300"
          
        >
          <Stack
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-xl font-semibold text-gray-400">Sales</Text>
              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#E7FF6B]/[0.3] "
              >
                <FaBoxOpen className="text-xl text-[#bede1c]" />
              </ActionIcon>
            </Group>
            <Text className="text-3xl font-semibold ">Rp. 232.227.800 </Text>
            <Text className="text-base text-gray-400 font-medium ">
              Sisa Sales Bulan Lalu{' '}
            </Text>
          </Stack>
        </Card> */}

        <Card
          w={300}
          radius={25}
          shadow=""
          className="overflow-visible h-fit py-5 border border-neutral-300"
        >
          <Stack
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-lg font-semibold text-gray-400">
                SC Karyawan
              </Text>
              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#FFA7B7]/[0.3]"
              >
                <FaPeopleGroup className="text-2xl text-[#FFA7B7]" />
              </ActionIcon>
            </Group>

            <CurrencyFormatter
              className="text-3xl font-semibold"
              currency="IDR"
              value={historyDetail.data?.remainingEmployeeService}
            />
            <Text className="text-base text-gray-400 font-medium ">
              Sisa Service Karyawan Bulan Lalu{' '}
            </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow=""
          className="overflow-visible h-fit py-5 border border-neutral-300"
        >
          <Stack
            justify="space-between"
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
            gap={20}
          >
            <Group justify="space-between">
              <Text className="text-lg text-gray-400 font-semibold">
                SC Manajemen
              </Text>

              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#A2FFB5]/[0.5]"
              >
                <IoFileTrayFull className="text-xl text-[#7fc58d]" />
              </ActionIcon>
            </Group>

            <CurrencyFormatter
              className="text-3xl font-semibold"
              currency="IDR"
              value={historyDetail.data?.remainingManagementService}
            />

            <Text className="text-base text-gray-400 font-medium ">
              Sisa Service Manajemen Bulan Lalu{' '}
            </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow=""
          className="overflow-visible h-fit py-5 border border-neutral-300"
        >
          <Stack
            justify="space-between"
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-xl text-gray-400 font-semibold">
                Bahan Baku
              </Text>

              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-indigo-200/[0.5]"
              >
                <PiAlignBottomBold className="text-indigo-600 text-2xl" />
              </ActionIcon>
            </Group>

            <CurrencyFormatter
              className="text-3xl font-semibold"
              currency="IDR"
              value={historyDetail.data?.remainingRawMaterials}
            />

            <Text className="text-base text-gray-400 font-medium ">
              Sisa Bahan Baku Bulan Lalu{' '}
            </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow=""
          className="overflow-visible h-fit py-5 border border-neutral-300"
        >
          <Stack
            justify="space-between"
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-xl text-gray-400 font-semibold">PPN</Text>

              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#A2FFB5]/[0.5]"
              >
                <HiReceiptTax className="text-green-600 text-2xl" />
              </ActionIcon>
            </Group>

            <CurrencyFormatter
              className="text-3xl font-semibold"
              currency="IDR"
              value={historyDetail.data?.remainingTax}
            />

            <Text className="text-base text-gray-400 font-medium ">
              Sisa PPN Bulan Lalu{' '}
            </Text>
          </Stack>
        </Card>
      </Group>

      <Stack
        gap={20}
        className="border shadow-sm border-gray-300 rounded-3xl h-[600px] overflow-y-auto scrollbar-hide md:h-full px-5 pt-5 pb-10"
      >
        <Stack gap={5}>
          <Text className="text-xl font-semibold">Kategori Pengeluaran</Text>
          <Text className="text-base text-neutral-400 font-medium">
            Jumlah Kategori : {totalExpenseByCategory.data?.expense.length}
          </Text>
        </Stack>

        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <MasterBalanceCard
              title="Total Pengeluaran"
              value={totalExpenseByCategory.data?.totalExpense}
              description={totalExpenseByCategory.data?.expense.length}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              {totalExpenseByCategory.data?.expense.map((categoryAmount) => (
                <MasterDataCard
                  amount={categoryAmount.amount}
                  title={categoryAmount.category}
                />
              ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default DirectorMasterData;
