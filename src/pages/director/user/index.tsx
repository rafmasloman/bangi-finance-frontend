import { ActionIcon, Group, Stack, Table, Text } from '@mantine/core';
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

import { useEffect, useState } from 'react';
import UserForm from '../../../features/director/user/components/UserForm';
import { useGetUserDetail } from '../../../api/user/hooks/useGetUserDetail';
import { useCreatePostUserAccount } from '../../../api/user/hooks/usePostUser';
import { useGetAllUsers } from '../../../api/user/hooks/useGetAllUser';
import { useDeleteUserAccount } from '../../../api/user/hooks/useDeleteUser';
import { IUserInputFormProps } from '../../../features/director/user/helpers/user.helper';
import { useUpdateUserAccount } from '../../../api/user/hooks/useUpdateUser';

const tableHead = [
  {
    label: 'No',
  },
  { label: 'Nama Lengkap' },
  { label: 'Email' },
  { label: 'Username' },
  { label: 'No Telp' },
  { label: 'Role' },
  { label: 'Action' },
];

const UserAccountPage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure();
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const createUser = useCreatePostUserAccount();
  const updateUser = useUpdateUserAccount();
  const userAccounts = useGetAllUsers();
  const userDetail = useGetUserDetail(userId ?? undefined);
  const deleteUser = useDeleteUserAccount();

  const handleSubmitForm = (values: IUserInputFormProps) => {
    // const createUserPayload = {
    //   firstname: values.firstname,
    //   lastname: values.lastname,
    //   email: values.email,
    //   phoneNumber: values.phoneNumber.toString(),
    //   password: values.password,
    //   role: 'EMPLOYEE',
    //   username: values.username,
    // };

    // const updateUserPayload = {
    //   firstname: values.firstname,
    //   lastname: values.lastname,
    //   email: values.email,
    //   phoneNumber: values.phoneNumber.toString(),
    //   password: !values.password ? undefined : values.password,
    //   role: 'EMPLOYEE',
    //   username: values.username,
    // };

    const userPayload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phoneNumber: values.phoneNumber.toString(),
      password: values.password,
      role: values.role,
      username: values.username,
    };

    if (!userId) {
      createUser.mutate(userPayload);
      close();
    } else if (!!userId) {
      updateUser.mutate({ id: userId, payload: userPayload });
      console.log('payload update : ', userPayload);
    }
  };

  const handleOpenModalEdit = (userId: string) => {
    if (userId) {
      setUserId(userId);
    }

    openEdit();
  };

  const handleOpenModalDelete = (userId: string) => {
    if (userId) {
      setUserId(userId);
    }

    openDelete();
  };

  const handleConfirmationDelete = () => {
    if (userId) {
      deleteUser.mutate(userId);
      setUserId(null);
      closeDelete();
    }
  };

  useEffect(() => {
    if (updateUser.isSuccess) {
      setUserId(null);
      closeEdit();
    }
  }, [updateUser.isSuccess, closeEdit]);

  if (!userAccounts.data) {
    return <Text>Loading ....</Text>;
  }

  return (
    <Stack>
      <ModalForm
        headerTitle="Form Input User"
        description="Form untuk menambah data user"
        opened={opened}
        size={'lg'}
        onClose={close}
      >
        <UserForm
          handleSubmit={handleSubmitForm}
          close={close}
          loading={createUser.isPending}
        />
      </ModalForm>

      <ModalForm
        headerTitle="Form Edit User"
        description="Form untuk mengubah data user"
        opened={openedEditForm}
        onClose={closeEdit}
        size={'lg'}
      >
        {!userDetail.data ? (
          <Text>Loading...</Text>
        ) : (
          <UserForm
            handleSubmit={handleSubmitForm}
            close={closeEdit}
            initialValues={userDetail.data}
            loading={updateUser.isPending}
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
          <Text className="font-semibold text-xl">User Management Data</Text>

          <BaseButton
            btnVariant="primary"
            onClick={open}
            leftSection={<FaPlus />}
          >
            Tambah User
          </BaseButton>
        </Group>
        <Stack className="overflow-x-auto scrollbar-hide">
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHead} />

            <TableDataBody
              data={userAccounts.data}
              columns={[
                { key: 'no', render: (row) => <Text>{row.no}</Text> },
                {
                  key: 'fullname',
                  render: (row) => (
                    <Text>{`${row.firstname} ${row.lastname}`}</Text>
                  ),
                },

                {
                  key: 'email',
                  render: (row) => <Text>{row.email}</Text>,
                },
                {
                  key: 'username',
                  render: (row) => <Text>{row.username}</Text>,
                },
                {
                  key: 'phoneNumber',
                  render: (row) => <Text>{row.phoneNumber}</Text>,
                },
                {
                  key: 'role',
                  render: (row) => (
                    <Text>{row.role === 'DIRECTOR' ? 'Boss' : 'Admin'}</Text>
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

export default UserAccountPage;
