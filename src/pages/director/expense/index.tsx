import {
  ActionIcon,
  Card,
  Group,
  Stack,
  Table,
  Tabs,
  Text,
} from '@mantine/core';
import TableDataHead from '../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../shared/components/table/TableDataBody';
import TableDataLayout from '../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../shared/components/button/BaseButton';
import { FaBoxOpen, FaPeopleGroup, FaPlus } from 'react-icons/fa6';
import { IoFileTrayFull } from 'react-icons/io5';
import { HiReceiptTax } from 'react-icons/hi';
import { useDisclosure } from '@mantine/hooks';
import ModalForm from '../../../features/director/components/modal/ModalForm';
import ExpenseForm from '../../../features/director/expense/components/ExpenseForm';
import { IExpenseRequestParams } from '../../../api/expense/ExpenseInterface';
import { useCreateExpense } from '../../../api/expense/hooks/useCreateExpense';
import { useGetAllExpenses } from '../../../api/expense/hooks/useGetAllExpense';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import CurrencyFormatter from '../../../shared/components/formatter/CurrencyFormatter';
import { useContext, useState } from 'react';
import { useDeleteExpense } from '../../../api/expense/hooks/useDeleteExpense';
import { useGetDetailExpenses } from '../../../api/expense/hooks/useGetDetailExpense';
import ModalDelete from '../../../features/director/components/modal/ModalDelete';
import { AuthContext } from '../../../context/AuthContext';
import ExpensePanel from '../../../features/director/expense/components/ExpensePanel';
import ExpenseCategoryPanel from '../../../features/director/expense/components/ExpenseCategoryPanel';
import { baseColors } from '../../../constants/colors';

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Tanggal' },
  { label: 'Keterangan' },
  { label: 'Jumlah' },
  { label: 'Kategori' },
  { label: 'Note' },
  { label: 'Action' },
];

const ExpenseDirectorPage = () => {
  return (
    <Stack>
      <Tabs
        defaultValue={'expenses'}
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
