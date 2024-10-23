import { ActionIcon, Group, Table } from '@mantine/core';
import { ITableBodyProps } from './TableDataLayout';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const TableDataBody = (props: ITableBodyProps) => {
  return (
    <Table.Tbody>
      {props.data.map((row, rowIndex) => {
        return (
          <Table.Tr key={rowIndex}>
            {/* {Object.values(row).map((body, index) => {
              return <Table.Td key={index}>{body}</Table.Td>;
            })} */}
            {props.columns?.map((column, index) => (
              <Table.Td key={index} className="text-nowrap">
                {column.render ? column.render(row) : row[column.key]}
              </Table.Td>
            ))}
            {props.onEdit && props.onDelete && (
              <Table.Td>
                <Group gap={10}>
                  <ActionIcon
                    onClick={() => props.onEdit!(row.no)}
                    radius={'md'}
                    size={27}
                    // variant="outline"
                    className="bg-indigo-500 text-lg"
                  >
                    <TbEdit />
                  </ActionIcon>

                  <ActionIcon
                    onClick={() => props.onDelete!(row.no)}
                    radius={'md'}
                    size={27}
                    // variant="outline"
                    className="bg-rose-400  text-md"
                  >
                    <MdOutlineDeleteOutline className=" text-lg" />
                  </ActionIcon>
                </Group>
              </Table.Td>
            )}
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  );
};

export default TableDataBody;
