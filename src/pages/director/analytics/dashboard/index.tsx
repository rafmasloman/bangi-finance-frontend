import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Group,
  Stack,
  Switch,
  Table,
  Text,
} from "@mantine/core";
import { FaChartLine } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiReceiptTax } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { PiMathOperationsDuotone } from "react-icons/pi";
import { tableHead } from "../../../../features/director/dashboard/utils/serviceData";
import TableDataLayout from "../../../../shared/components/table/TableDataLayout";
import TableDataHead from "../../../../shared/components/table/TableDataHead";
import TableDataBody from "../../../../shared/components/table/TableDataBody";
import AnalyticsCard from "../../../../features/director/dashboard/components/AnalyticsCard";
import { useGetIncomeAnalytics } from "../../../../api/income/hooks/useGetIncomeAnalytics";
import CurrencyFormatter from "../../../../shared/components/formatter/CurrencyFormatter";
import BalanceCard from "../../../../features/director/dashboard/components/BalanceCard";
import { useGetMDR } from "../../../../api/history/hooks/useGetMDR";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateMDR } from "../../../../api/history/hooks/useUpdateMDR";
import { useParams } from "react-router-dom";
import ModalForm from "../../../../features/director/components/modal/ModalForm";
import MDRForm from "../../../../features/director/dashboard/components/MDRForm";
import { useGetRemainingData } from "../../../../api/history/hooks/useGetRemainingDataHistory";
import { useGetSupplierAmountByPaymentStatus } from "../../../../api/supplier/hooks/useGetSupplierAmountByStatus";
import { useState } from "react";
import { useGetDetailHistory } from "../../../../api/history/hooks/useGetHistoryDetail";

const DirectorDashboardPage = () => {
  const { historyId } = useParams();
  const [isPaid, setIsPaid] = useState(false);

  const analyticsIncome = useGetIncomeAnalytics();
  const mdr = useGetMDR();
  const updateMDR = useUpdateMDR();
  const remainingData = useGetRemainingData();
  const suppliers = useGetSupplierAmountByPaymentStatus(
    isPaid ? "PAID" : "UNPAID"
  );
  const historyDetail = useGetDetailHistory(historyId, true);

  const [opened, { open, close }] = useDisclosure();

  const handleSubmitUpdateForm = (values: { mdr: number }) => {
    updateMDR.mutate({ id: historyId, payload: { mdr: values.mdr } });

    close();
  };

  if (analyticsIncome.isLoading && analyticsIncome.isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack className="h-fit" gap={30}>
      {/* <Group justify="end">
        
      </Group> */}

      <Group
        wrap="nowrap"
        className="overflow-y-visible pb-8 overflow-x-auto scrollbar-hide"
      >
        <BalanceCard
          value={remainingData.data?.balance}
          month={historyDetail.data?.month}
        />

        <AnalyticsCard
          title="Total Sales"
          value={analyticsIncome.data?.salesAnalytics.total}
          iconColor="#678983"
          icon={
            <ActionIcon
              variant="light"
              radius={"xl"}
              className={`bg-[#EBD9B4]/[0.7] xl:size-10`}
            >
              <FaChartLine className="text-xs xl:text-xl text-[#9DBC98]" />
            </ActionIcon>
          }
        >
          <Group align="start" gap={5}>
            <Text className="text-xs xl:text-base text-gray-400 font-medium">
              Sisa :{" "}
            </Text>
            <CurrencyFormatter
              currency="IDR"
              value={remainingData.data?.remainingSales}
              className="font-medium"
            />
          </Group>
        </AnalyticsCard>

        <AnalyticsCard
          title="Average"
          value={analyticsIncome.data?.average}
          iconColor="#678983"
          icon={
            <ActionIcon
              variant="light"
              radius={"xl"}
              className={`bg-[#9DBC98]/[0.4] xl:size-10 `}
            >
              <PiMathOperationsDuotone className="text-base xl:text-2xl text-[#638889]" />
            </ActionIcon>
          }
        >
          <Stack align="start" gap={10}>
            <Text className="text-nowrap text-xs xl:text-base text-gray-400 font-medium">
              Rata-rata bulan {historyDetail.data?.month}
            </Text>
          </Stack>
        </AnalyticsCard>

        <AnalyticsCard
          title="Collection"
          value={analyticsIncome.data?.collectionAnalytics.total}
          iconColor="#A2FFB5"
          icon={
            <ActionIcon
              variant="light"
              radius={"xl"}
              className={`bg-[#F9EFDB]/[0.7] xl:size-10`}
            >
              <FaMoneyCheckDollar className="text-base xl:text-xl text-[#9DBC98]" />
            </ActionIcon>
          }
        >
          <Stack align="start" gap={10}>
            <Text className="text-nowrap text-xs xl:text-base text-gray-400 font-medium">
              Collection Bulan {historyDetail.data?.month}
            </Text>
          </Stack>
        </AnalyticsCard>
      </Group>

      <ModalForm onClose={close} opened={opened} title="Form Ubah MDR">
        <MDRForm
          close={close}
          handleSubmit={handleSubmitUpdateForm}
          initialValues={{ mdr: mdr.data?.mdr }}
        />
      </ModalForm>

      <Group
        wrap="nowrap"
        className=" overflow-x-auto no-scrollbar scrollbar-hide pb-8 "
      >
        <Card
          radius={25}
          shadow="sm"
          className=" h-full overflow-visible"
          withBorder
        >
          <Stack
            gap={20}
            className="text-nowrap w-[300px] md:w-[320px]  xl:w-[350px] h-fit"
          >
            <Group justify="space-between" align="start">
              <Stack align="start" gap={10}>
                <Text className="text-xl text-black_primary font-semibold">
                  Services
                </Text>
              </Stack>

              <ActionIcon
                variant="light"
                radius={"xl"}
                className="bg-[#FFA7B7]/[0.3]"
              >
                <MdManageAccounts className="text-xl text-[#FFA7B7]" />
              </ActionIcon>
            </Group>

            <Group justify="space-between" align="center">
              <Stack>
                <CurrencyFormatter
                  currency="IDR"
                  value={analyticsIncome.data?.servicesAnalytics.total}
                  className="text-3xl font-bold "
                />

                <Accordion
                  classNames={{
                    root: `w-[300px] md:w-[320px] xl:w-[350px] h-fit`,
                    item: `border-0 `,
                    control: `p-0 `,
                    itemTitle: ` `,
                    panel: `p-0`,
                    content: `p-0`,
                  }}
                >
                  <Accordion.Item value="a">
                    <Accordion.Control>
                      <Group gap={30}>
                        <Stack gap={0}>
                          <Text className="font-medium text-gray-400">
                            Manajemen
                          </Text>
                          <CurrencyFormatter
                            currency="IDR"
                            value={
                              analyticsIncome.data?.servicesAnalytics.category
                                .management
                            }
                            className="font-medium"
                          />
                        </Stack>
                        <Stack gap={0}>
                          <Text className="font-medium text-gray-400">
                            Karyawan
                          </Text>
                          <CurrencyFormatter
                            currency="IDR"
                            value={
                              analyticsIncome.data?.servicesAnalytics.category
                                .employe
                            }
                            className="font-medium"
                          />
                        </Stack>
                      </Group>
                    </Accordion.Control>

                    <Accordion.Panel>
                      <Group>
                        <Stack gap={0}>
                          <Text className="font-medium text-gray-400">
                            Sisa Manajemen
                          </Text>
                          <CurrencyFormatter
                            currency="IDR"
                            value={
                              remainingData.data
                                ?.remainingMonthManagementService
                            }
                            className="font-medium"
                          />
                        </Stack>

                        <Stack gap={0}>
                          <Text className="font-medium text-gray-400">
                            Sisa Karyawan
                          </Text>
                          <CurrencyFormatter
                            currency="IDR"
                            value={
                              remainingData.data?.remainingMontEmployeeService
                            }
                            className="font-medium"
                          />
                        </Stack>
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Card
          radius={25}
          shadow="md"
          className="overflow-visible h-full"
          withBorder
        >
          <Stack
            gap={20}
            className="text-nowrap w-[300px] md:w-[320px]  xl:w-[350px]"
          >
            <Group justify="space-between" align="start">
              <Stack align="start" gap={10}>
                <Text className="text-xl text-black_primary font-semibold">
                  PPN
                </Text>
              </Stack>

              <ActionIcon
                variant="light"
                radius={"xl"}
                className="bg-[#BCAEFF]/[0.3]"
              >
                <HiReceiptTax className="text-xl text-[#BCAEFF]" />
              </ActionIcon>
            </Group>

            <Group justify="space-between" align="center">
              <Stack>
                <CurrencyFormatter
                  currency="IDR"
                  value={analyticsIncome.data?.ppnAnalytics.total}
                  className="text-3xl font-bold "
                />

                <Group gap={30}>
                  <Stack gap={0}>
                    <Text className="font-medium text-gray-400">Sisa</Text>
                    <CurrencyFormatter
                      currency="IDR"
                      value={remainingData.data?.remainingMonthTax}
                      className="font-medium"
                    />
                  </Stack>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Card
          radius={25}
          shadow="md"
          className="overflow-visible h-full"
          withBorder
        >
          <Stack
            gap={20}
            className="text-nowrap w-[300px] md:w-[320px]  xl:w-[350px]"
          >
            <Group justify="space-between" align="start" className="w-full">
              <Stack align="start" gap={10}>
                <Text className="text-xl text-black_primary font-semibold">
                  MDR
                </Text>
              </Stack>

              <ActionIcon
                variant="light"
                radius={"xl"}
                className="bg-green-700/[0.2]"
              >
                <RiDiscountPercentFill className="text-xl text-green-500/[0.5]" />
              </ActionIcon>
            </Group>

            <Group justify="space-between" align="center" className="w-full">
              <Stack>
                <CurrencyFormatter
                  currency="IDR"
                  value={mdr.data?.totalMDR}
                  className="text-3xl font-bold "
                />

                <Group
                  className="w-[300px] md:w-[320px]  xl:w-[350px]"
                  wrap="nowrap"
                  justify="space-between"
                >
                  <Stack gap={0}>
                    <Text className="font-medium text-gray-400">
                      Jumlah MDR :{" "}
                    </Text>
                    <Text className="font-semibold text-green-500">
                      {" "}
                      {mdr.data?.mdr} %
                    </Text>
                  </Stack>
                  <Button
                    radius={"md"}
                    classNames={{ root: `w-fit px-3 py-1 h-fit` }}
                    variant="outline"
                    color="green"
                    onClick={open}
                  >
                    <Text className="text-sm">Ubah MDR</Text>
                  </Button>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Card>
      </Group>

      <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Group gap={10}>
            <Text className="font-semibold text-base md:text-lg">
              Total Supplier {`${isPaid ? "Paid" : "Unpaid"}`} :
            </Text>
            <CurrencyFormatter
              className={`${
                isPaid ? "text-green-500" : "text-rose-500"
              } font-medium text-base  md:text-lg`}
              currency="IDR"
              value={suppliers.data?.totalPayment}
            />
          </Group>

          <Switch
            checked={isPaid}
            onChange={(event) => setIsPaid(event.currentTarget.checked)}
            classNames={{
              track: `${
                isPaid ? "bg-green-400" : "bg-rose-400"
              } px-3 py-4 border-0 `,
              trackLabel: `text-white text-sm font-normal`,
              input: ``,
              thumb: `${isPaid ? "" : "ml-1.5"}`,
            }}
            size="md"
            onLabel={"PAID"}
            offLabel={"UNPAID"}
          />
        </Group>
        <Stack className="overflow-x-auto scrollbar-hide" gap={30}>
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHead} />

            {!suppliers.data ? (
              <Text>Loading...</Text>
            ) : (
              <TableDataBody
                data={suppliers.data.payment}
                columns={[
                  {
                    key: "no",
                    render: (row) => (
                      <Text className="text-base">{row.no}</Text>
                    ),
                  },
                  {
                    key: "name",
                    render: (row) => (
                      <Text className="text-base">{row.name}</Text>
                    ),
                  },
                  {
                    key: "total-amount",
                    render: (row) => (
                      <CurrencyFormatter
                        className="text-base"
                        currency="IDR"
                        value={row.totalAmount}
                      />
                    ),
                  },
                ]}
              />
            )}
          </Table>
        </Stack>
      </TableDataLayout>
    </Stack>
  );
};

export default DirectorDashboardPage;
