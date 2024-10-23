import {
  ActionIcon,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import TableDataHead from '../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../shared/components/table/TableDataBody';
import TableDataLayout from '../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../shared/components/button/BaseButton';
import { FaPlus } from 'react-icons/fa6';
import ModalForm from '../../../features/director/components/modal/ModalForm';
import { useDisclosure } from '@mantine/hooks';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import ModalDelete from '../../../features/director/components/modal/ModalDelete';
import { useState } from 'react';
import SupplierCommunityForm from '../../../features/director/community/supplier-community/components/SupplierCommunityForm';
import { useGetAllSupplierCategory } from '../../../api/supplier-category/hooks/useGetAllSupplierCategory';
import { useCreateSupplierCategory } from '../../../api/supplier-category/hooks/useCreateSupplierCategory';
import { ISupplierCommunityInputProps } from '../../../features/director/community/supplier-community/helpers/supplier-community-helper';
import { useDeleteSupplierCategory } from '../../../api/supplier-category/hooks/useDeleteSupplierCategory';
import { useGetDetailSupplierCompany } from '../../../api/supplier-category/hooks/useGetDetailSupplierCategory';
import { useUpdateSupplierCategory } from '../../../api/supplier-category/hooks/useUpdateSupplierCategory';

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Supplier Name' },
  { label: 'Action' },
];

const SupplierCommunityPage = () => {
  const [supplierCategoryID, setSupplierCategoryID] = useState<string | null>(
    null,
  );

  const [opened, { open, close }] = useDisclosure();
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const supplierCategories = useGetAllSupplierCategory();
  const createSupplierCat = useCreateSupplierCategory();
  const deleteSupplierCategory = useDeleteSupplierCategory();
  const updateSupplierCategory = useUpdateSupplierCategory();
  const supplierCategoryDetail = useGetDetailSupplierCompany(
    supplierCategoryID ?? undefined,
    openedEditForm,
  );

  const handleSubmitForm = (values: ISupplierCommunityInputProps) => {
    if (values && !supplierCategoryID) {
      createSupplierCat.mutate(values);
      close();
    } else if (!!supplierCategoryID) {
      updateSupplierCategory.mutate({
        id: supplierCategoryID,
        payload: values,
      });
      closeEdit();
    }
  };

  const handleOpenModalEdit = (supplierId: string | null) => {
    if (supplierId) {
      setSupplierCategoryID(supplierId);
    }

    openEdit();
  };

  const handleOpenModalDelete = (supplierId: string | null) => {
    if (supplierId) {
      setSupplierCategoryID(supplierId);
    }

    openDelete();
  };

  const handleConfirmationDelete = (id: string | null) => {
    if (id) {
      deleteSupplierCategory.mutate(id);
      closeDelete();
    }
  };

  if (!supplierCategories.data) {
    return <Text>Loading ....</Text>;
  }

  return (
    <Stack>
      <ModalForm
        headerTitle="Form Input Nama Supplier"
        description="Form untuk menambah data komunitas supplier"
        opened={opened}
        onClose={close}
      >
        <SupplierCommunityForm handleSubmit={handleSubmitForm} close={close} />
      </ModalForm>

      <ModalForm
        headerTitle="Form Edit Nama Supplier"
        description="Form untuk mengubah data komunitas supplier"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {supplierCategoryDetail.isFetching ? (
          <Text>Loading....</Text>
        ) : (
          <SupplierCommunityForm
            handleSubmit={handleSubmitForm}
            close={closeEdit}
            initialValues={supplierCategoryDetail.data}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Supplier"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={() => handleConfirmationDelete(supplierCategoryID)}
      />

      <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Text className="font-semibold text-base md:text-xl">
            Data Supplier Community / Name
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
            data={supplierCategories.data}
            columns={[
              { key: 'no', render: (row) => <Text>{row.no}</Text> },
              {
                key: 'name',
                render: (row) => <Text>{row.name}</Text>,
              },

              {
                key: 'action',
                render: (row) => (
                  <Flex direction={'row'} gap={10} className="text-nowrap ">
                    <ActionIcon
                      onClick={() => handleOpenModalEdit(row.id)}
                      radius={'md'}
                      size={27}
                      className="bg-indigo-400 text-lg"
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
                  </Flex>
                ),
              },
            ]}
          />
        </Table>
      </TableDataLayout>
    </Stack>
  );
};

export default SupplierCommunityPage;
