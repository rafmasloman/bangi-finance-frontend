import { ActionIcon, Group, Stack, Table, Text } from '@mantine/core';
import TableDataHead from '../../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../../shared/components/table/TableDataBody';
import TableDataLayout from '../../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { FaPlus } from 'react-icons/fa6';
import ModalForm from '../../../../features/director/components/modal/ModalForm';
import { useDisclosure } from '@mantine/hooks';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import ModalDelete from '../../../../features/director/components/modal/ModalDelete';
import { useState } from 'react';
import { useGetAllExpensesCategories } from '../../../../api/expense-category/hooks/useGetAllExpenseCategories';
import { useUpdateExpenseCategory } from '../../../../api/expense-category/hooks/useUpdateExpenseCategory';
import { IExpenseCategoryInputProps } from '../../../../features/director/community/expense-categories/helpers/expense-category-helper';
import ExpenseCategoryForm from '../../../../features/director/community/expense-categories/components/ExpenseCategoryForm';
import { useCreateExpenseCategory } from '../../../../api/expense-category/hooks/useCreateExpenseCategory';
import { useGetDetailExpensesCategory } from '../../../../api/expense-category/hooks/useGetDetailExpenseCategory';
import { useDeleteExpenseCategory } from '../../../../api/expense-category/hooks/useDeleteExpenseCategory';

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Category Name' },
  { label: 'Action' },
];

const ExpenseCategoryPanel = () => {
  const [expenseCategoryId, setExpenseCategoryId] = useState<string | null>(
    null,
  );

  const [opened, { open, close }] = useDisclosure();
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const expenseCategories = useGetAllExpensesCategories();
  const createExpenseCategory = useCreateExpenseCategory();
  const deleteExpenseCategory = useDeleteExpenseCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const expenseCategoryDetail = useGetDetailExpensesCategory(
    expenseCategoryId ?? undefined,
    openedEditForm,
  );

  const handleSubmitForm = (values: IExpenseCategoryInputProps) => {
    if (values && !expenseCategoryId) {
      createExpenseCategory.mutate(values);
      close();
    } else if (!!expenseCategoryId) {
      updateExpenseCategory.mutate({ id: expenseCategoryId, payload: values });
      closeEdit();
    }
  };

  const handleOpenModalEdit = (id: string) => {
    if (id) {
      setExpenseCategoryId(id);
    }

    openEdit();
  };

  const handleOpenModalDelete = (id: string) => {
    if (id) {
      setExpenseCategoryId(id);
    }

    openDelete();
  };

  const handleConfirmationDelete = () => {
    if (expenseCategoryId) {
      deleteExpenseCategory.mutate(expenseCategoryId);

      closeDelete();
    }

    setExpenseCategoryId(null);
  };

  if (!expenseCategories.data) {
    return <Text>Loading ....</Text>;
  }

  return (
    <>
      <ModalForm
        headerTitle="Form Input Nama Supplier"
        description="Form untuk menambah data komunitas supplier"
        opened={opened}
        onClose={close}
      >
        <ExpenseCategoryForm handleSubmit={handleSubmitForm} close={close} />
      </ModalForm>

      <ModalForm
        headerTitle="Edit Kategori Pengeluaran"
        description="Form untuk mengubah data kategori pengeluaran"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {expenseCategoryDetail.isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <ExpenseCategoryForm
            handleSubmit={handleSubmitForm}
            close={closeEdit}
            initialValues={expenseCategoryDetail.data}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Pengeluaran"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={handleConfirmationDelete}
      />

      <Stack className="overflow-x-auto scrollbar-hide">
        <TableDataLayout>
          <Group justify="space-between" className="w-full h-fit py-3.5">
            <Text className="font-semibold text-xl">
              Data Expense Community / Name
            </Text>

            <BaseButton
              btnVariant="primary"
              onClick={open}
              leftSection={<FaPlus />}
            >
              Input Community
            </BaseButton>
          </Group>
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHead} />

            <TableDataBody
              data={expenseCategories.data}
              columns={[
                { key: 'no', render: (row) => <Text>{row.no}</Text> },
                {
                  key: 'name',
                  render: (row) => <Text>{row.name}</Text>,
                },

                {
                  key: 'action',
                  render: (row) => (
                    <Group gap={10}>
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
        </TableDataLayout>
      </Stack>
    </>
  );
};

export default ExpenseCategoryPanel;
