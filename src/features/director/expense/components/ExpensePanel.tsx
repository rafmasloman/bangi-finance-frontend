import {
  ActionIcon,
  Button,
  ComboboxItem,
  Group,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import TableDataHead from "../../../../shared/components/table/TableDataHead";
import TableDataBody from "../../../../shared/components/table/TableDataBody";
import TableDataLayout from "../../../../shared/components/table/TableDataLayout";
import BaseButton from "../../../../shared/components/button/BaseButton";
import { FaPlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import ModalForm from "../../../../features/director/components/modal/ModalForm";
import ExpenseForm from "../../../../features/director/expense/components/ExpenseForm";
import { IExpenseRequestParams } from "../../../../api/expense/ExpenseInterface";
import { useCreateExpense } from "../../../../api/expense/hooks/useCreateExpense";
import { useGetAllExpenses } from "../../../../api/expense/hooks/useGetAllExpense";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import CurrencyFormatter from "../../../../shared/components/formatter/CurrencyFormatter";
import { useContext, useEffect, useState } from "react";
import { useDeleteExpense } from "../../../../api/expense/hooks/useDeleteExpense";
import { useGetDetailExpenses } from "../../../../api/expense/hooks/useGetDetailExpense";
import ModalDelete from "../../../../features/director/components/modal/ModalDelete";
import { AuthContext } from "../../../../context/AuthContext";
import { tableHeadExpense } from "../helpers/expense.helper";
import { useParams } from "react-router-dom";
import { useUpdateExpense } from "../../../../api/expense/hooks/useUpdateExpense";
import moment from "moment";
import { exportToExcel, formatRupiah } from "../../../../shared/utils/helpers";
import { useGetDetailHistory } from "../../../../api/history/hooks/useGetHistoryDetail";
import { HiFolderArrowDown } from "react-icons/hi2";

const ExpensePanel = () => {
  const { user } = useContext(AuthContext);
  const { historyId } = useParams();

  const [expenseId, setExpenseId] = useState<string | null>(null);
  const [selectedExpCat, setSelectedExpCat] = useState<ComboboxItem | null>(
    null
  );

  const [opened, { open, close }] = useDisclosure(false);

  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();
  const expenses = useGetAllExpenses(selectedExpCat?.value);
  const expenseDetail = useGetDetailExpenses(
    expenseId ?? undefined,
    openedEditForm
  );
  const historyDetail = useGetDetailHistory(historyId);

  console.log("cat : ", selectedExpCat?.value);

  const expenseCategoriesData = [
    "SALES",
    "SERVICE_KARYAWAN",
    "SERVICE_MANAJEMEN",
    "PPN ",
    "GAJI_KARYAWAN",
    "PENGEMBALIAN_MODAL",
    "OPERASIONAL",
  ];

  const exportExcel = () => {
    const excelDataFileType = expenses.data?.map((exp) => {
      console.log("expenses : ", exp);

      return {
        No: exp.no.toString(),
        "Tanggal Input": moment(exp.date).format("DD MMMM YYYY"),
        Keterangan: exp.evidence,
        Kategori: exp.expenseCategory,
        Jumlah: exp.price,
        User: exp.user.firstname,
        Catatan: exp.note,
      };
    });

    const excelDatas = exportToExcel(excelDataFileType, "Pengeluaran", {
      month: historyDetail.data?.month,
      year: historyDetail.data?.year,
      createdAt: moment(historyDetail.data?.date).format("YYYY-MM-DD"),
    });

    return excelDatas;
  };

  const handleSubmitExpense = (values: IExpenseRequestParams) => {
    const data = {
      evidence: values.evidence,
      price: values.price,
      expenseCategory: values.expenseCategory,
      note: values.note,
      date: values.date,
      historyId,
      userId: user?.id,
    };

    if (!!expenseId) {
      updateExpense.mutate({ payload: data, id: expenseId });
    } else {
      createExpense.mutate(data);
      close();
    }
  };

  const handleOpenModalEdit = (id: string) => {
    if (id) {
      setExpenseId(id);
    }

    openEdit();
  };

  const handleOpenModalDelete = (id: string) => {
    if (id) {
      setExpenseId(id);
    }

    openDelete();
  };

  const handleConfirmationDelete = (id: string | null) => {
    if (id) {
      deleteExpense.mutate(id);

      closeDelete();
    }
  };

  useEffect(() => {
    if (updateExpense.isSuccess) {
      closeEdit();
      setExpenseId(null);
    }
  }, [updateExpense.isSuccess, closeEdit]);

  if (expenses.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <ModalForm
        headerTitle="Form Pengeluaran"
        description="Form untuk menambah data pengeluaran"
        opened={opened}
        onClose={close}
      >
        <ExpenseForm handleSubmit={handleSubmitExpense} close={close} />
      </ModalForm>

      <ModalForm
        headerTitle="Edit Pengeluaran"
        description="Form untuk mengubah data pengeluaran"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {expenseDetail.isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <ExpenseForm
            handleSubmit={handleSubmitExpense}
            close={closeEdit}
            initialValues={expenseDetail.data}
            isLoading={updateExpense.isPending}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Pengeluaran"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={() => handleConfirmationDelete(expenseId)}
      />

      <Text className="text-xl font-semibold">Halaman Pengeluaran</Text>
      {/* 
      <Group
        wrap="nowrap"
        className="w-full overflow-scroll no-scrollbar scrollbar-hide"
      >
        <Card
          radius={25}
          shadow="xs"
          w={300}
          className=" h-fit py-5 overflow-visible"
          withBorder
        >
          <Stack
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-xl font-semibold text-gray-400">
                Total Sales :
              </Text>
              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#E7FF6B]/[0.3] "
              >
                <FaBoxOpen className="text-xl text-[#bede1c]" />
              </ActionIcon>
            </Group>
            <Text className="text-3xl font-semibold ">Rp. 232.227.800 </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow="xs"
          className="overflow-visible h-fit py-5"
          withBorder
        >
          <Stack
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-lg font-semibold text-gray-400">
                SC Karyawan
              </Text>
              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#FFA7B7]/[0.3]"
              >
                <FaPeopleGroup className="text-2xl text-[#FFA7B7]" />
              </ActionIcon>
            </Group>

            <Text className="text-3xl font-semibold">Rp 14.514.238 </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow="xs"
          className="overflow-visible h-fit py-5"
          withBorder
        >
          <Stack
            justify="space-between"
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
            gap={20}
          >
            <Group justify="space-between">
              <Text className="text-lg text-gray-400 font-semibold">
                SC Manajemen
              </Text>

              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#A2FFB5]/[0.5]"
              >
                <IoFileTrayFull className="text-xl text-[#7fc58d]" />
              </ActionIcon>
            </Group>

            <Text className="text-3xl font-semibold">Rp 1.869.187 </Text>
          </Stack>
        </Card>

        <Card
          w={300}
          radius={25}
          shadow="xs"
          className="overflow-visible h-fit py-5"
          withBorder
        >
          <Stack
            justify="space-between"
            gap={20}
            className="text-nowrap w-[230px] md:w-[180px] lg:w-[200px] xl:w-full"
          >
            <Group justify="space-between">
              <Text className="text-xl text-gray-400 font-semibold">PPN</Text>

              <ActionIcon
                variant="light"
                size={40}
                radius={'xl'}
                className="bg-[#A2FFB5]/[0.5]"
              >
                <HiReceiptTax className="text-green-600 text-2xl" />
              </ActionIcon>
            </Group>

            <Text className="text-3xl font-semibold"> Rp 24.158.274</Text>
          </Stack>
        </Card>
      </Group> */}

      <TableDataLayout>
        <Group justify="space-between" className="w-full h-fit py-3.5">
          <Text className="font-semibold text-xl">Data Pengeluaran</Text>

          <Group>
            <Button
              radius={"md"}
              bg={"#33c481"}
              leftSection={<HiFolderArrowDown color="white" size={20} />}
              onClick={exportExcel}
              classNames={{
                root: `border border-[#107c41] shadow-[4px_4px_0] shadow-[#107c41] hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300`,
                label: `text-white`,
              }}
            >
              Export to excel
            </Button>

            <BaseButton leftSection={<FaPlus />} onClick={open}>
              Input Pengeluaran
            </BaseButton>

            <Select
              placeholder="Pilih Kategori Pengeluaran"
              data={
                !expenseCategoriesData
                  ? [
                      {
                        label: "",
                        value: "",
                      },
                    ]
                  : expenseCategoriesData.map((expense) => {
                      return {
                        label: expense,
                        value: expense,
                      };
                    })
              }
              value={selectedExpCat ? selectedExpCat.value : null}
              onChange={(_value, option) => setSelectedExpCat(option)}
              classNames={{}}
            />
          </Group>
        </Group>

        <Stack className="overflow-x-auto scrollbar-hide">
          <Table classNames={{ th: `text-base` }}>
            <TableDataHead data={tableHeadExpense} />

            {!expenses.data ? null : (
              <TableDataBody
                data={expenses.data}
                columns={[
                  { key: "no", render: (row) => <Text>{row.no}</Text> },
                  {
                    key: "date",
                    render: (row) => <Text>{row.date}</Text>,
                  },
                  {
                    key: "evidence",
                    render: (row) => (
                      <Text className="text-nowrap">{row.evidence}</Text>
                    ),
                  },
                  {
                    key: "price",
                    render: (row) => (
                      <CurrencyFormatter
                        currency="IDR"
                        value={row.price}
                        className="text-nowrap"
                      />
                    ),
                  },
                  {
                    key: "category",
                    render: (row) => (
                      <Text className="text-nowrap">{row.expenseCategory}</Text>
                    ),
                  },
                  {
                    key: "user",
                    render: (row) => (
                      <Text className="text-nowrap">{row.user.firstname}</Text>
                    ),
                  },
                  {
                    key: "note",
                    render: (row) => (
                      <Text className="text-nowrap">{row.note}</Text>
                    ),
                  },
                  // {
                  //   key: 'user',
                  //   render: (row) => (
                  //     <Text className="text-nowrap">{row.user.firstname}</Text>
                  //   ),
                  // },
                  {
                    key: "action",
                    render: (row) => (
                      <Group gap={10} wrap="nowrap">
                        <ActionIcon
                          onClick={() => handleOpenModalEdit(row.id)}
                          radius={"md"}
                          size={27}
                          className="bg-indigo-500 text-lg"
                        >
                          <TbEdit />
                        </ActionIcon>

                        <ActionIcon
                          onClick={() => handleOpenModalDelete(row.id)}
                          radius={"md"}
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
      </TableDataLayout>
    </Stack>
  );
};

export default ExpensePanel;
