import { Table } from '@mantine/core';
import { ITableHeaderProps } from './TableDataLayout';

const TableDataHead = (props: ITableHeaderProps) => {
  return (
    <Table.Thead className="text-nowrap">
      <Table.Tr>
        {props.data.map((th, index) => {
          return <Table.Th key={index}>{th.label}</Table.Th>;
        })}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableDataHead;
