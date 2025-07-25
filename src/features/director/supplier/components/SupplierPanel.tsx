import {
  ActionIcon,
  Checkbox,
  Divider,
  Group,
  Stack,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import TableDataLayout from "../../../../shared/components/table/TableDataLayout";
import BaseButton from "../../../../shared/components/button/BaseButton";
import TableDataHead from "../../../../shared/components/table/TableDataHead";
import TableDataBody from "../../../../shared/components/table/TableDataBody";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CurrencyFormatter from "../../../../shared/components/formatter/CurrencyFormatter";
import { useCreateSupplier } from "../../../../api/supplier/hooks/useCreateSupplier";
import { useUpdateSupplier } from "../../../../api/supplier/hooks/useUpdateSupplier";
import { useDeleteSupplier } from "../../../../api/supplier/hooks/useDeleteSupplier";
import { useGetSupplierDetail } from "../../../../api/supplier/hooks/useGetSupplierDetail";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useContext, useEffect, useState } from "react";
import { ISupplierRequestParams } from "../../../../api/supplier/SupplierApiInterface";
import {
  checkSelecteCheckbox,
  tableHeadSuppliers,
} from "../helpers/supplier.helper";
import moment from "moment";
import SupplierForm from "./SupplierForm";
import ModalForm from "../../components/modal/ModalForm";
import ModalDelete from "../../components/modal/ModalDelete";
import { PaymentStatus } from "../../../../api/ApiInterface";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useUpdateSupplierPaymentStatus } from "../../../../api/supplier/hooks/useUpdatePaymentStatus";
import SupplierPaymentStatusForm from "./SupplierPaymentStatusForm";

interface ISupplierPanelProps {
  suppliers: {
    no: number;
    id: string;
    // discount: number;
    // evidence: string;
    // ppn: number;
    // price: number;
    // quantity: number;
    nomorFaktur: string;
    jatuhTempo: string;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    date: string;
    supplierCompany: {
      id: number;
      name: string;
    };
  }[];
  controlInput: ReactNode;
}

const SupplierPanel = (props: ISupplierPanelProps) => {
  const { historyId } = useParams();
  const { user } = useContext(AuthContext);
  const [supplierId, setSupplierId] = useState<string | null>(null);
  const [, setSupplierPaymentId] = useState<string[] | null>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditForm, { open: openEdit, close: closeEdit }] =
    useDisclosure();
  const [
    openedEditPaymentForm,
    { open: openEditPayment, close: closeEditPayment },
  ] = useDisclosure();
  const [openedDeleteForm, { open: openDelete, close: closeDelete }] =
    useDisclosure();

  const createSupplier = useCreateSupplier();
  const updateSupplier = useUpdateSupplier();
  const updatePaymentStatus = useUpdateSupplierPaymentStatus();
  const deleteSupplier = useDeleteSupplier();
  const supplierDetail = useGetSupplierDetail(
    supplierId ?? undefined,
    openedEditForm
  );

  const handleCheckAll = () => {
    if (
      checkSelecteCheckbox(props.suppliers.length, selectedRows).isAllSelected
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(props.suppliers.map((supplier) => supplier.id));
    }
  };

  const handleRowSelection = (id: any) => (event: any) => {
    setSelectedRows(
      event.currentTarget.checked
        ? [...selectedRows, id]
        : selectedRows.filter((selectedId) => selectedId !== id)
    );
  };

  const handleUpdatePaymentStatus = (values: {
    paymentStatus: "PAID" | "UNPAID";
  }) => {
    const data = {
      id: selectedRows,
      paymentStatus: values.paymentStatus,
    };

    updatePaymentStatus.mutate({
      id: data.id ?? undefined,
      paymentStatus: data.paymentStatus,
    });
  };

  const handleSubmitSupplier = (values: ISupplierRequestParams) => {
    // const data = {
    //   discount: values.discount,
    //   supplierCompanyId: Number(values.supplierCompanyId),
    //   evidence: values.evidence,
    //   ppn: values.ppn,
    //   price: values.price,
    //   quantity: values.quantity,
    //   date: moment(values.date).format(),
    //   historyId,
    //   userId: user?.id,
    // };

    const data = {
      nomorFaktur: values.nomorFaktur,
      jatuhTempo: moment(values.jatuhTempo).format(),
      totalAmount: values.totalAmount,
      supplierCompanyId: Number(values.supplierCompanyId),
      date: moment(values.date).format(),
      historyId,
      userId: user?.id,
    };

    if (!!supplierId) {
      updateSupplier.mutate({
        data: {
          ...data,
        },
        id: supplierId,
      });
    } else {
      createSupplier.mutate({
        ...data,
        paymentStatus: "UNPAID",
      });
      close();
    }
  };

  const handleOpenModalEdit = (supplierId: string | null) => {
    if (supplierId) {
      setSupplierId(supplierId);
    }

    openEdit();
  };

  const handleOpenModalPaymentStatus = (supplierId: string) => {
    // if (supplierId) {
    // }

    setSupplierPaymentId([supplierId]);

    openEditPayment();
  };

  const handleOpenModalDelete = (supplierId: string | null) => {
    if (supplierId) {
      setSupplierId(supplierId);
    }

    openDelete();
  };

  const handleConfirmationDelete = (id: string | null) => {
    if (id) {
      deleteSupplier.mutate(id);
      closeDelete();
    }
  };

  useEffect(() => {
    if (updateSupplier.isSuccess) {
      setSupplierId(null);
      closeEdit();
    }
  }, [updateSupplier.isSuccess, closeEdit]);

  useEffect(() => {
    if (updatePaymentStatus.isSuccess) {
      closeEditPayment();
      setSelectedRows([]);
    }
  }, [updatePaymentStatus.isSuccess, closeEditPayment]);

  return (
    <>
      <ModalForm
        headerTitle="Form Supplier"
        description="Form untuk menambah data supplier"
        opened={opened}
        onClose={close}
      >
        <SupplierForm
          close={close}
          handleSubmit={handleSubmitSupplier}
          loading={createSupplier.isPending}
        />
      </ModalForm>

      <ModalForm
        headerTitle="Form Status Supplier"
        description="Form untuk mengubah status supplier"
        opened={openedEditPaymentForm}
        onClose={closeEditPayment}
      >
        {supplierDetail.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <SupplierPaymentStatusForm
            close={closeEditPayment}
            handleSubmit={handleUpdatePaymentStatus}
            initialValues={{
              paymentStatus: supplierDetail.data?.paymentStatus,
            }}
          />
        )}
      </ModalForm>

      <ModalForm
        headerTitle="Edit Supplier"
        description="Form untuk mengedit data supplier"
        opened={openedEditForm}
        onClose={closeEdit}
      >
        {supplierDetail.isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <SupplierForm
            close={closeEdit}
            handleSubmit={handleSubmitSupplier}
            initialValues={supplierDetail.data}
            loading={updateSupplier.isPending}
          />
        )}
      </ModalForm>

      <ModalDelete
        name="Supplier"
        opened={openedDeleteForm}
        onClose={closeDelete}
        onDelete={() => handleConfirmationDelete(supplierId)}
      />

      <Stack gap={30}>
        <TableDataLayout>
          <Group justify="space-between" className="w-full h-fit py-1">
            <Text className="font-semibold text-base lg:text-xl">
              Data Supplier
            </Text>

            <Group>
              <BaseButton
                disabled={selectedRows.length <= 0}
                leftSection={<FaPlus />}
                onClick={openEditPayment}
              >
                Ubah Status
              </BaseButton>

              <BaseButton leftSection={<FaPlus />} onClick={open}>
                Input Supplier
              </BaseButton>
            </Group>
          </Group>

          <Divider my={"md"} />

          <Stack className="">
            <Text className="font-semibold text-base lg:text-md">
              Filter Supplier
            </Text>
            <Group justify="flex-start ">{props.controlInput}</Group>
          </Stack>

          <Stack className="overflow-x-auto scrollbar-hide mt-5">
            <Table
              classNames={{
                th: `text-base `,
              }}
            >
              <TableDataHead
                checkbox={
                  <Checkbox
                    checked={
                      checkSelecteCheckbox(props.suppliers.length, selectedRows)
                        .isAllSelected
                    }
                    indeterminate={
                      checkSelecteCheckbox(props.suppliers.length, selectedRows)
                        .isSomeSelected
                    }
                    onChange={handleCheckAll}
                  />
                }
                data={tableHeadSuppliers}
              />

              {!props.suppliers ? null : (
                <TableDataBody
                  data={props.suppliers}
                  columns={[
                    {
                      key: "checkbox",
                      render: (row) => (
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={handleRowSelection(row.id)}
                        />
                      ),
                    },

                    { key: "no", render: (row) => <Text>{row.no}</Text> },
                    {
                      key: "date",
                      render: (row) => <Text>{row.date}</Text>,
                    },
                    {
                      key: "supplier",
                      render: (row) => <Text>{row.supplierCompany.name}</Text>,
                    },
                    {
                      key: "nomorFaktur",
                      render: (row) => (
                        <Text className="text-nowrap">{row.nomorFaktur}</Text>
                      ),
                    },
                    // {
                    //   key: "evidence",
                    //   render: (row) => (
                    //     <Text className="text-nowrap">{row.evidence}</Text>
                    //   ),
                    // },
                    // {
                    //   key: "quantity",
                    //   render: (row) => <Text>{row.quantity}</Text>,
                    // },
                    // {
                    //   key: "price",
                    //   render: (row) => (
                    //     <CurrencyFormatter
                    //       currency="IDR"
                    //       value={row.price}
                    //       className="text-nowrap"
                    //     />
                    //   ),
                    // },
                    // {
                    //   key: "discount",
                    //   render: (row) => <Text>{row.discount}%</Text>,
                    // },
                    // {
                    //   key: "ppn",
                    //   render: (row) => (
                    //     <CurrencyFormatter currency="IDR" value={row.ppn} />
                    //   ),
                    // },

                    {
                      key: "totalAmount",
                      render: (row) => (
                        <CurrencyFormatter
                          currency="IDR"
                          value={row.totalAmount}
                        />
                      ),
                    },

                    {
                      key: "jatuhTempo",
                      render: (row) => <Text>{row.jatuhTempo}</Text>,
                    },

                    {
                      key: "status",
                      render: (row) => (
                        <UnstyledButton
                          onClick={() => handleOpenModalPaymentStatus(row.id)}
                        >
                          <PaymentStatusBadge
                            size="lg"
                            fullWidth
                            isPay={row.paymentStatus === "PAID"}
                          >
                            {row.paymentStatus}
                          </PaymentStatusBadge>
                        </UnstyledButton>
                      ),
                    },
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
    </>
  );
};

export default SupplierPanel;
