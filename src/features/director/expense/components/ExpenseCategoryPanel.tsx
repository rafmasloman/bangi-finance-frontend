import { Group, Stack, Table, Text } from '@mantine/core';
import TableDataHead from '../../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../../shared/components/table/TableDataBody';
import TableDataLayout from '../../../../shared/components/table/TableDataLayout';
import { useGetExpenseCategories } from '../../../../api/expense/hooks/useGetExpenseCategories';

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Category Name' },
];

const ExpenseCategoryPanel = () => {
  const expenseCategories = useGetExpenseCategories();

  if (!expenseCategories.data) {
    return <Text>Loading ....</Text>;
  }

  return (
    <>
      <Stack className="overflow-x-auto scrollbar-hide">
        <TableDataLayout>
          <Group justify="space-between" className="w-full h-fit py-3.5">
            <Text className="font-semibold text-xl">
              Data Expense Community / Name
            </Text>
          </Group>
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHead} />

            <TableDataBody
              data={expenseCategories.data}
              columns={[
                { key: 'no', render: (row) => <Text>{row.no}</Text> },
                {
                  key: 'name',
                  render: (row) => <Text>{row.category}</Text>,
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
