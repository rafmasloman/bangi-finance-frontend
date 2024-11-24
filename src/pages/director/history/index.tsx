import {
  ActionIcon,
  Card,
  Drawer,
  Group,
  Image,
  Menu,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import BaseButton from '../../../shared/components/button/BaseButton';
import { FaCircleInfo, FaPlus } from 'react-icons/fa6';
import { useDisclosure } from '@mantine/hooks';
import ModalForm from '../../../features/director/components/modal/ModalForm';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useContext, useEffect, useState } from 'react';
import ModalDelete from '../../../features/director/components/modal/ModalDelete';
import { AuthContext } from '../../../context/AuthContext';
import HistoryForm from '../../../features/director/history/components/HistoryForm';
import { useGetAllHistories } from '../../../api/history/hooks/useGetAllHistories';
import { useCreateHistory } from '../../../api/history/hooks/useCreateHistory';
import { IHistoryRequestPayload } from '../../../api/history/HistoryInterface';
import {
  convertMonthInput,
  convertYearInput,
} from '../../../features/director/history/helpers/history.helper';
import { useGetDetailHistory } from '../../../api/history/hooks/useGetHistoryDetail';
import { useDeleteHistory } from '../../../api/history/hooks/useDeleteHistory';
import { FcOpenedFolder, FcRight } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useUpdateHistory } from '../../../api/history/hooks/useUpdateHistory';
import { EmptyStateHistory } from '../../../assets/images';

const DirectorHistoryPage = () => {
  const { user } = useContext(AuthContext);

  
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [historyId, setHistoryId] = useState<string | null>(null);
  // const [filterDate, setFilterDate] = useState<Date | null>(null);
  // const [monthFilter, setMonthFilter] = useState<string | null>(null);
  // const [yearFilter, setYearFilter] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const createHistory = useCreateHistory();
  const updateHistory = useUpdateHistory();
  const deleteHistory = useDeleteHistory();
  const histories = useGetAllHistories();
  const historyDetail = useGetDetailHistory(
    historyId ?? undefined,
    openedEditForm,
  );

  // const handleFilterDate = (value: any) => {
  //   const monthLocalTime = new Intl.DateTimeFormat('id-ID', {
  //     month: 'long',
  //   }).format(new Date(value));

  //   const yearLocalTime = new Intl.DateTimeFormat('id-ID', {
  //     year: 'numeric',
  //   }).format(new Date(value));

  //   setMonthFilter(monthLocalTime);
  //   setYearFilter(yearLocalTime);
  //   setFilterDate(value);
  // };

  const handleSubmitHistory = (values: IHistoryRequestPayload) => {
    const initialMonth = convertMonthInput(values.date);
    const initialYear = convertYearInput(values.date);

    const data = {
      title: initialMonth.toString(),
      remainingEmployeeService: values.remainingEmployeeService,
      remainingManagementService: values.remainingManagementService,
      remainingRawMaterials: values.remainingRawMaterials,
      remainingSales: 0,
      remainingTax: values.remainingTax,
      date: values.date,
      month: initialMonth,
      year: initialYear,
      userId: user?.id,
    };

    if (!!historyId) {
      updateHistory.mutate({ id: historyId, payload: data });
    } else {
      createHistory.mutate(data);
      close();
    }
  };

  const handleOpenModalEdit = (id: string) => {
    if (id) {
      setHistoryId(id);
    }

    openEdit();
  };

  const handleOpenModalDelete = (id: string) => {
    if (id) {
      setHistoryId(id);
    }

    openDelete();
  };

  const handleConfirmationDelete = (id: string | null) => {
    if (id) {
      deleteHistory.mutate(id);

      closeDelete();
    }
  };

  useEffect(() => {
    if (updateHistory.isSuccess) {
      setHistoryId(null);
      closeEdit();
    }
  }, [updateHistory.isSuccess, closeEdit]);

  //   if (histories.isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  return (
    <Stack>
      <Drawer
        position="right"
        opened={openedDrawer}
        onClose={closeDrawer}
      ></Drawer>

      <ModalForm
        headerTitle="Form Buku"
        description="Form untuk menambah data buku"
        opened={opened}
        onClose={close}
      >
        <HistoryForm
          handleSubmit={handleSubmitHistory}
          close={close}
          loading={createHistory.isPending}
        />
      </ModalForm>

      <ModalForm
        headerTitle="Edit Buku"
        description="Form untuk mengubah data buku"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {historyDetail.isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <HistoryForm
            handleSubmit={handleSubmitHistory}
            close={closeEdit}
            initialValues={historyDetail.data}
            loading={updateHistory.isPending}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Buku"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={() => handleConfirmationDelete(historyId)}
      />

      <Group justify="space-between" className="w-full h-fit py-3.5">
        <Text className="font-semibold text-xl">Data History</Text>

        <Group wrap="nowrap">
          <BaseButton leftSection={<FaPlus />} onClick={open}>
            Input History
          </BaseButton>
        </Group>
      </Group>

      {/* <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Text className="font-semibold text-xl">Data History</Text>

          <Group wrap="nowrap">
            
            <BaseButton leftSection={<FaPlus />} onClick={open}>
              Input History
            </BaseButton>
          </Group>
        </Group>
        <Stack className="overflow-x-auto scrollbar-hide">
          <Table
            classNames={{
              th: `text-base`,
            }}
          >
            <TableDataHead data={tableHead} />

            {!histories.data ? null : (
              <TableDataBody
                data={histories.data}
                columns={[
                  { key: 'no', render: (row) => <Text>{row.no}</Text> },
                  { key: 'title', render: (row) => <Text>{row.title}</Text> },

                  {
                    key: 'remainingEmployeeService',
                    render: (row) => (
                      <CurrencyFormatter
                        className="text-nowrap"
                        currency="IDR"
                        value={row.remainingEmployeeService}
                      />
                    ),
                  },
                  {
                    key: 'remainingManagementService',
                    render: (row) => (
                      <CurrencyFormatter
                        currency="IDR"
                        value={row.remainingManagementService}
                        className="text-nowrap"
                      />
                    ),
                  },

                  {
                    key: 'remainingTax',
                    render: (row) => (
                      <CurrencyFormatter
                        className="text-nowrap"
                        value={row.remainingTax}
                        currency="IDR"
                      />
                    ),
                  },

                  {
                    key: 'remainingSales',
                    render: (row) => (
                      <CurrencyFormatter
                        className="text-nowrap"
                        value={row.remainingSales}
                        currency="IDR"
                      />
                    ),
                  },
                  {
                    key: 'remainingRawMaterials',
                    render: (row) => (
                      <CurrencyFormatter
                        className="text-nowrap"
                        value={row.remainingRawMaterials}
                        currency="IDR"
                      />
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
            )}
          </Table>
        </Stack>
      </TableDataLayout> */}

      {!histories.data || histories.data.length <= 0 ? (
        <Stack gap={0} justify="center" align="center">
          <Image src={EmptyStateHistory} className="w-[450px] h-20" />
          <Text className="text-xl md:text-2xl text-gray-400 font-medium">
            History Belum dibuat
          </Text>
        </Stack>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {histories.data?.map((history, index) => {
            return (
              <Card
                key={index + 1}
                classNames={{
                  section: `space-y-5`,
                  root: `rounded-2xl px-8 py-7 bg-primary/[0.3] border-2 border-black_primary shadow-[4px_4px_0] shadow-black_primary/[0.7]   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
                }}
              >
                <Card.Section>
                  <Group justify="space-between">
                    <FcOpenedFolder size={40} />

                    <Menu
                      classNames={{
                        dropdown: ``,
                      }}
                      position="bottom-end"
                    >
                      <Menu.Target>
                        <ActionIcon
                          variant="transparent"
                          classNames={{
                            icon: `hover:text-gray-500 text-black_primary`,
                          }}
                        >
                          <BiDotsHorizontalRounded
                            size={30}
                            className="cursor-pointer hover:text-gray-500"
                          />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => handleOpenModalEdit(history.id)}
                          className="text-indigo-600 font-medium"
                          leftSection={<TbEdit className=" text-lg" />}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          className="text-rose-500 font-medium"
                          leftSection={
                            <MdOutlineDeleteOutline className=" text-lg" />
                          }
                          onClick={() => handleOpenModalDelete(history.id)}
                        >
                          Hapus
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <Stack gap={5}>
                    <Text className="text-xl font-semibold">
                      {history.title}
                    </Text>
                    <Text className="text-sm text-gray-400 font-medium">
                      Dibuat pada 02 Desember 2003
                    </Text>
                  </Stack>

                  <Group justify="space-between ">
                    <Group gap={5} className="z-20">
                      <FcRight />
                      <Text
                        className="text-sm text-indigo-400 font-medium hover:text-indigo-700"
                        component={Link}
                        to={`/books/director/${history.id}/dashboard`}
                      >
                        Masuk ke Buku
                      </Text>
                    </Group>
                    <Group gap={5} className="z-20" onClick={openDrawer}>
                      <FaCircleInfo className="text-sm text-emerald-600" />
                      <Text className="text-sm text-gray-400 font-medium hover:text-yellow-500">
                        Informasi
                      </Text>
                    </Group>
                  </Group>
                </Card.Section>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default DirectorHistoryPage;
