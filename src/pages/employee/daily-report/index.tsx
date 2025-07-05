import { ActionIcon, Button, Group, Stack, Table, Text } from "@mantine/core";
import TableDataHead from "../../../shared/components/table/TableDataHead";
import TableDataBody from "../../../shared/components/table/TableDataBody";
import TableDataLayout from "../../../shared/components/table/TableDataLayout";
import BaseButton from "../../../shared/components/button/BaseButton";
import { FaPlus } from "react-icons/fa6";
import ModalForm from "../../../features/director/components/modal/ModalForm";
import { useDisclosure } from "@mantine/hooks";
import IncomeForm from "../../../features/director/daily-report/components/IncomeForm";
import { IIncomeFormInputData } from "../../../features/director/daily-report/helpers/income.helper";
import { useCreateIncome } from "../../../api/income/hooks/useCreateIncome";
import { useGetAllIncomes } from "../../../api/income/hooks/useGetAllIncome";
import CurrencyFormatter from "../../../shared/components/formatter/CurrencyFormatter";
import { TbEdit } from "react-icons/tb";
import { useUpdateIncome } from "../../../api/income/hooks/useUpdateIncome";
import { useContext, useState } from "react";
import { useGetIncomeDetail } from "../../../api/income/hooks/useGetIncomeDetail";
import moment from "moment";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import historyServiceApi from "../../../api/history/HistoryService";
import { useGetDetailHistory } from "../../../api/history/hooks/useGetHistoryDetail";
import { HiFolderArrowDown } from "react-icons/hi2";

const tableHead = [
  {
    label: "No",
  },
  { label: "Tanggal" },
  { label: "Item Sales" },
  { label: "Item Discount" },
  { label: "Bill Discount" },
  { label: "Foc Item" },
  { label: "Foc Bill" },
  { label: "Total Sales" },
  { label: "PPN" },
  { label: "Service" },
  { label: "Totall Collection" },
  { label: "Action" },
];

const EmployeeDailyReportPage = () => {
  const { user } = useContext(AuthContext);
  const [incomeId, setIncomeId] = useState<string | null>(null);
  const { historyId } = useParams();

  const [opened, { open, close }] = useDisclosure();
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();

  const incomes = useGetAllIncomes();
  const createIncome = useCreateIncome();
  const incomeDetail = useGetIncomeDetail(incomeId ?? undefined);
  const updateIncome = useUpdateIncome();

  const historyDetail = useGetDetailHistory(historyId, !!historyId);

  const exportExcel = async () => {
    const blob = await historyServiceApi.exportHistoryExcelData({
      historyId: historyId ?? "",
      type: "all",
    });

    const filename = `${historyDetail.data?.title}_${historyDetail.data?.year}`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename
      .toLowerCase()
      .replace(/\s+/g, "_")}_exported_data`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmitForm = (values: IIncomeFormInputData) => {
    if (!incomeId && !!user?.id) {
      createIncome.mutate({
        date: values.date,
        focBill: values.focBill,
        historyId: historyId!,
        itemSales: values.itemSales,
        service: values.service,
        billDiscount: values.billDiscount,
        focItem: values.focItem,
        itemDiscount: values.itemDiscount,
        userId: user.id,
      });
      close();
    } else if (!!incomeId && !!user?.id) {
      updateIncome.mutate({
        id: incomeId,
        body: {
          date: values.date,
          focBill: values.focBill,
          historyId: historyId!,
          itemSales: values.itemSales,
          service: values.service,
          billDiscount: values.billDiscount,
          focItem: values.focItem,
          itemDiscount: values.itemDiscount,
          userId: user.id,
        },
      });
      setIncomeId(null);
      closeEdit();
    }
  };

  const handleOpenModalEdit = (incomeId: string) => {
    if (incomeId) {
      setIncomeId(incomeId);
    }

    openEdit();
  };

  if (!incomes.data) {
    return <Text>Loading ....</Text>;
  }

  return (
    <Stack>
      <ModalForm
        headerTitle="Form Input Pemasukan"
        description="Form untuk menambah data pemasukan"
        opened={opened}
        onClose={close}
      >
        <IncomeForm handleSubmit={handleSubmitForm} close={close} />
      </ModalForm>

      <ModalForm
        headerTitle="Form Edit Pemasukan"
        description="Form untuk mengubah data pemasukan"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {!incomeDetail.data ? (
          <Text>Loading...</Text>
        ) : (
          <IncomeForm
            handleSubmit={handleSubmitForm}
            close={closeEdit}
            initialValues={incomeDetail.data}
          />
        )}
      </ModalForm>

      <Button
        radius={"md"}
        rightSection={<HiFolderArrowDown color="white" size={20} />}
        onClick={exportExcel}
        classNames={{
          root: `rounded-xl bg-green-600 h-12 border-gray-400 hover:border-gray-100 border-1  w-fit hover:bg-green-500 duration-300`,
          label: `text-white font-bold`,
          section: `p-1.5`,
          inner: `px-4`,
        }}
      >
        Export Semua Hasil
      </Button>

      <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Text className="font-semibold text-xl">Daily Report Data</Text>

          <BaseButton
            btnVariant="primary"
            onClick={open}
            leftSection={<FaPlus />}
          >
            Input Pemasukkan
          </BaseButton>
        </Group>

        <Stack className="overflow-x-auto scrollbar-hide">
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHead} />

            <TableDataBody
              data={incomes.data}
              columns={[
                { key: "no", render: (row) => <Text>{row.no}</Text> },
                {
                  key: "itemSales",
                  render: (row) => (
                    <Text>{moment(row.date).format("DD MMMM YYYY")}</Text>
                  ),
                },
                {
                  key: "itemSales",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.itemSales} />
                  ),
                },
                {
                  key: "itemDiscount",
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.itemDiscount}
                    />
                  ),
                },
                {
                  key: "billDiscount",
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.billDiscount}
                    />
                  ),
                },
                {
                  key: "focItem",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.focItem} />
                  ),
                },
                {
                  key: "focBill",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.focBill} />
                  ),
                },
                {
                  key: "totalSales",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.totalSales} />
                  ),
                },
                {
                  key: "ppn",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.ppn} />
                  ),
                },
                {
                  key: "service",
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.service} />
                  ),
                },
                {
                  key: "totalCollection",
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.totalCollection}
                    />
                  ),
                },
                {
                  key: "action",
                  render: (row) => (
                    <Group gap={10} wrap="nowrap">
                      <ActionIcon
                        onClick={() => handleOpenModalEdit(row.id)}
                        radius={"md"}
                        size={27}
                        className="bg-indigo-500 text-lg"
                      >
                        <TbEdit />
                      </ActionIcon>
                    </Group>
                  ),
                },
              ]}
            />
          </Table>
        </Stack>
      </TableDataLayout>
    </Stack>
  );
};

export default EmployeeDailyReportPage;
