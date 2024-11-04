import { ActionIcon, Group, Stack, Table, Text } from '@mantine/core';
import TableDataHead from '../../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../../shared/components/table/TableDataBody';
import TableDataLayout from '../../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { FaPlus } from 'react-icons/fa6';
import { useDisclosure } from '@mantine/hooks';
import ModalForm from '../../../../features/director/components/modal/ModalForm';
import ExpenseForm from '../../../../features/director/expense/components/ExpenseForm';
import { IExpenseRequestParams } from '../../../../api/expense/ExpenseInterface';
import { useCreateExpense } from '../../../../api/expense/hooks/useCreateExpense';
import { useGetAllExpenses } from '../../../../api/expense/hooks/useGetAllExpense';
import { TbEdit } from 'react-icons/tb';
import CurrencyFormatter from '../../../../shared/components/formatter/CurrencyFormatter';
import { useContext, useEffect, useState } from 'react';
import { useGetDetailExpenses } from '../../../../api/expense/hooks/useGetDetailExpense';
import { AuthContext } from '../../../../context/AuthContext';
import { tableHeadExpense } from '../helpers/expense.helper';
import { useParams } from 'react-router-dom';
import { useUpdateExpense } from '../../../../api/expense/hooks/useUpdateExpense';

const ExpensePanelEmployee = () => {
  const { user } = useContext(AuthContext);
  const { historyId } = useParams();

  const [expenseId, setExpenseId] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();

  const createExpense = useCreateExpense();
  const expenses = useGetAllExpenses();
  const updateExpense = useUpdateExpense();
  const expenseDetail = useGetDetailExpenses(
    expenseId ?? undefined,
    openedEditForm,
  );

  const handleSubmitExpense = (values: IExpenseRequestParams) => {
    const data = {
      evidence: values.evidence,
      price: values.price,
      expenseCategory: values.expenseCategory,
      note: values.note,
      date: values.date,
      historyId,
      userId: user?.id,
    };

    if (!!expenseId) {
      updateExpense.mutate({ payload: data, id: expenseId });
    } else {
      createExpense.mutate(data);
      close();
    }
  };

  const handleOpenModalEdit = (id: string) => {
    if (id) {
      setExpenseId(id);
    }

    openEdit();
  };

  useEffect(() => {
    if (updateExpense.isSuccess) {
      closeEdit();
      setExpenseId(null);
    }
  }, [updateExpense.isSuccess, closeEdit]);

  if (expenses.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <ModalForm
        headerTitle="Form Pengeluaran"
        description="Form untuk menambah data pengeluaran"
        opened={opened}
        onClose={close}
      >
        <ExpenseForm handleSubmit={handleSubmitExpense} close={close} />
      </ModalForm>

      <ModalForm
        headerTitle="Edit Pengeluaran"
        description="Form untuk mengubah data pengeluaran"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {expenseDetail.isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <ExpenseForm
            handleSubmit={handleSubmitExpense}
            close={closeEdit}
            initialValues={expenseDetail.data}
          />
        )}
      </ModalForm>

      <Text className="text-xl font-semibold">Halaman Pengeluaran</Text>

      <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Text className="font-semibold text-xl">Data Pengeluaran</Text>

          <BaseButton leftSection={<FaPlus />} onClick={open}>
            Input Pengeluaran
          </BaseButton>
        </Group>
        <Stack className="overflow-x-auto scrollbar-hide">
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHeadExpense} />

            {!expenses.data ? null : (
              <TableDataBody
                data={expenses.data}
                columns={[
                  { key: 'no', render: (row) => <Text>{row.no}</Text> },
                  {
                    key: 'date',
                    render: (row) => <Text>{row.date}</Text>,
                  },
                  {
                    key: 'evidence',
                    render: (row) => (
                      <Text className="text-nowrap">{row.evidence}</Text>
                    ),
                  },
                  {
                    key: 'price',
                    render: (row) => (
                      <CurrencyFormatter
                        currency="IDR"
                        value={row.price}
                        className="text-nowrap"
                      />
                    ),
                  },
                  {
                    key: 'category',
                    render: (row) => (
                      <Text className="text-nowrap">
                        {row.expenseCategory.name}
                      </Text>
                    ),
                  },
                  {
                    key: 'note',
                    render: (row) => (
                      <Text className="text-nowrap">{row.note}</Text>
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
                      </Group>
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

export default ExpensePanelEmployee;
