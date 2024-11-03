import {
  ActionIcon,
  Group,
  NumberFormatter,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import TableDataHead from '../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../shared/components/table/TableDataBody';
import TableDataLayout, {
  ITableRow,
} from '../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../shared/components/button/BaseButton';
import { FaPlus } from 'react-icons/fa6';
import ModalForm from '../../../features/director/components/modal/ModalForm';
import { useDisclosure } from '@mantine/hooks';
import IncomeForm from '../../../features/director/daily-report/components/IncomeForm';
import { IIncomeFormInputData } from '../../../features/director/daily-report/helpers/income.helper';
import { useCreateIncome } from '../../../api/income/hooks/useCreateIncome';
import { useGetAllIncomes } from '../../../api/income/hooks/useGetAllIncome';
import CurrencyFormatter from '../../../shared/components/formatter/CurrencyFormatter';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import ModalDelete from '../../../features/director/components/modal/ModalDelete';
import { useDeleteIncome } from '../../../api/income/hooks/useDeleteIncome';
import { useUpdateIncome } from '../../../api/income/hooks/useUpdateIncome';
import { useContext, useEffect, useState } from 'react';
import { useGetIncomeDetail } from '../../../api/income/hooks/useGetIncomeDetail';
import moment from 'moment';
import { AuthContext } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

const tableData: ITableRow[] = [
  {
    no: 1,
    itemSales: 10300000,
    itemDiscount: null,
    billDiscount: 71400,
    focItem: null,
    totalSales: 10228600,
    ppn: 1022860,
    service: 509750,
    collection: 11761210,
  },
  {
    no: 2,
    itemSales: 10300000,
    itemDiscount: null,
    billDiscount: 71400,
    focItem: null,
    totalSales: 10228600,
    ppn: 1022860,
    service: 509750,
    collection: 11761210,
  },
  {
    no: 3,
    itemSales: 10300000,
    itemDiscount: null,
    billDiscount: 71400,
    focItem: null,
    totalSales: 10228600,
    ppn: 1022860,
    service: 509750,
    collection: 11761210,
  },
  {
    no: 4,
    itemSales: 10300000,
    itemDiscount: null,
    billDiscount: 71400,
    focItem: null,
    totalSales: 10228600,
    ppn: 1022860,
    service: 509750,
    collection: 11761210,
  },
];

// const tableData: ITableRow[] = [
//     {
//       key: 'No',
//       value: 1,
//     },
//     { key: 'Item Sales', value: 10300000 },
//     { key: 'Item Discount', value: null },
//     { key: 'Bill Discount', value: 71400 },
//     { key: 'Foc Item', value: null },
//     { key: 'Total Sales', value: 10228600 },
//     { key: 'PPN', value: 1022860 },
//     { key: 'Service', value: 509750 },
//     { key: 'Totall Collection', value: 11761210 },
//   ];

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Tanggal' },
  { label: 'Item Sales' },
  { label: 'Item Discount' },
  { label: 'Bill Discount' },
  { label: 'Foc Item' },
  { label: 'Foc Bill' },
  { label: 'Total Sales' },
  { label: 'PPN' },
  { label: 'Service' },
  { label: 'Totall Collection' },
  { label: 'Action' },
];

const DailyReportPage = () => {
  const { user } = useContext(AuthContext);
  const [incomeId, setIncomeId] = useState<string | null>(null);
  const { historyId } = useParams();

  const [opened, { open, close }] = useDisclosure();
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const incomes = useGetAllIncomes();
  const createIncome = useCreateIncome();
  const incomeDetail = useGetIncomeDetail(incomeId ?? undefined);
  const deleteIncome = useDeleteIncome();
  const updateIncome = useUpdateIncome();

  console.log('detail income : ', incomeDetail.data);

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
    }
  };

  const handleOpenModalEdit = (incomeId: string) => {
    if (incomeId) {
      setIncomeId(incomeId);
    }

    openEdit();
  };

  const handleOpenModalDelete = (incomeId: string) => {
    if (incomeId) {
      setIncomeId(incomeId);
    }

    openDelete();
  };

  const handleConfirmationDelete = () => {
    if (incomeId) {
      deleteIncome.mutate(incomeId);
      setIncomeId(null);
      closeDelete();
    }
  };

  useEffect(() => {
    if (updateIncome.isSuccess) {
      setIncomeId(null);
      closeEdit();
    }
  }, [updateIncome.isSuccess, closeEdit]);

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
        <IncomeForm
          handleSubmit={handleSubmitForm}
          close={close}
          loading={createIncome.isPending}
        />
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
            loading={updateIncome.isPending}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Pemasukkan"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={handleConfirmationDelete}
      />

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
                { key: 'no', render: (row) => <Text>{row.no}</Text> },
                {
                  key: 'itemSales',
                  render: (row) => (
                    <Text>{moment(row.date).format('DD MMMM YYYY')}</Text>
                  ),
                },
                {
                  key: 'itemSales',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.itemSales} />
                  ),
                },
                {
                  key: 'itemDiscount',
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.itemDiscount}
                    />
                  ),
                },
                {
                  key: 'billDiscount',
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.billDiscount}
                    />
                  ),
                },
                {
                  key: 'focItem',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.focItem} />
                  ),
                },
                {
                  key: 'focBill',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.focBill} />
                  ),
                },
                {
                  key: 'totalSales',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.totalSales} />
                  ),
                },
                {
                  key: 'ppn',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.ppn} />
                  ),
                },
                {
                  key: 'service',
                  render: (row) => (
                    <CurrencyFormatter currency="IDR" value={row.service} />
                  ),
                },
                {
                  key: 'totalCollection',
                  render: (row) => (
                    <CurrencyFormatter
                      currency="IDR"
                      value={row.totalCollection}
                    />
                  ),
                },
                {
                  key: 'action',
                  render: (row) => (
                    <Group gap={10} wrap="nowrap">
                      <ActionIcon
                        onClick={() => handleOpenModalEdit(row.id)}
                        radius={'md'}
                        size={27}
                        className="bg-indigo-500 text-lg"
                      >
                        <TbEdit />
                      </ActionIcon>

                      <ActionIcon
                        onClick={() => handleOpenModalDelete(row.id)}
                        radius={'md'}
                        size={27}
                        className="bg-rose-400  text-md"
                      >
                        <MdOutlineDeleteOutline className=" text-lg" />
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

export default DailyReportPage;
