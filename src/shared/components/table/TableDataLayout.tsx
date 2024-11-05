import { Stack } from '@mantine/core';
import { ReactNode } from 'react';

// Interface untuk data dinamis
export interface ITableRow {
  [key: string]: any | null;
}

export interface ITableColumn {
  key: string;
  render?: (row: ITableRow) => React.ReactNode; // Fungsi render untuk konten khusus
}

// Props untuk ITableHeader
export interface ITableHeaderProps {
  data: { label: string }[]; // Data yang berupa array dari objek dinamis
  checkbox?: any;
}

// Props untuk ITableBody
export interface ITableBodyProps {
  data: ITableRow[]; // Data yang berupa array dari objek dinamis
  onEdit?: (row: ITableRow) => void;
  onDelete?: (row: ITableRow) => void;
  columns?: ITableColumn[];
}

interface ITableDataLayoutPropsType {
  // text: string;
  children: ReactNode;
}

const TableDataLayout = (props: ITableDataLayoutPropsType) => {
  return (
    <Stack
      gap={20}
      justify="space-between"
      className="border border-gray-300 px-8 py-5 rounded-2xl shadow-sm bg-white h-full "
    >
      {props.children}
    </Stack>
  );
};

export default TableDataLayout;
