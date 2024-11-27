import { Stack, Tabs } from "@mantine/core";
import ExpensePanel from "../../../features/director/expense/components/ExpensePanel";
import ExpenseCategoryPanel from "../../../features/director/expense/components/ExpenseCategoryPanel";

const ExpenseDirectorPage = () => {
  return (
    <Stack>
      <Tabs
        defaultValue={"expenses"}
        classNames={{
          panel: `mt-7`,
          tab: `w-[180px] data-[active=true]:bg-primary/[0.5] px-5 py-3 data-[active=true]:text-black_primary data-[active=true]:border data-[active=true]:border-neutral-300 data-[active=true]:border-solid font-semibold`,
          root: `mt-5`,
          list: `bg-white `,
        }}
        variant="pills"
        radius={10}
      >
        <Tabs.List>
          <Tabs.Tab value="expenses">Pengeluaran</Tabs.Tab>
          <Tabs.Tab value="expenses-categories">Kategory Pengeluaran</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="expenses">
          <ExpensePanel />
        </Tabs.Panel>

        <Tabs.Panel value="expenses-categories">
          <ExpenseCategoryPanel />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default ExpenseDirectorPage;
