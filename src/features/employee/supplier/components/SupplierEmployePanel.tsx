import {
  ActionIcon,
  Checkbox,
  Group,
  Stack,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { FaPlus } from 'react-icons/fa';
import TableDataLayout from '../../../../shared/components/table/TableDataLayout';
import BaseButton from '../../../../shared/components/button/BaseButton';
import TableDataHead from '../../../../shared/components/table/TableDataHead';
import TableDataBody from '../../../../shared/components/table/TableDataBody';
import PaymentStatusBadge from './PaymentStatusBadge';
import { TbEdit } from 'react-icons/tb';
import CurrencyFormatter from '../../../../shared/components/formatter/CurrencyFormatter';
import { useCreateSupplier } from '../../../../api/supplier/hooks/useCreateSupplier';
import { useUpdateSupplier } from '../../../../api/supplier/hooks/useUpdateSupplier';
import { useGetSupplierDetail } from '../../../../api/supplier/hooks/useGetSupplierDetail';
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { ISupplierRequestParams } from '../../../../api/supplier/SupplierApiInterface';
import { tableHeadSuppliers } from '../helpers/supplier.helper';
import moment from 'moment';
import SupplierForm from './SupplierForm';
import { PaymentStatus } from '../../../../api/ApiInterface';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { useUpdateSupplierPaymentStatus } from '../../../../api/supplier/hooks/useUpdatePaymentStatus';
import ModalForm from '../../../director/components/modal/ModalForm';
import SupplierPaymentStatusForm from './SupplierPaymentStatusForm';

interface ISupplierEmployeePanelProps {
  suppliers: {
    no: number;
    id: string;
    discount: number;
    evidence: string;
    ppn: number;
    price: number;
    quantity: number;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    date: string;
    supplierCompany: {
      id: number;
      name: string;
    };
  }[];
}

const SupplierEmployeePanel = (props: ISupplierEmployeePanelProps) => {
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

  const createSupplier = useCreateSupplier();
  const updateSupplier = useUpdateSupplier();
  const updatePaymentStatus = useUpdateSupplierPaymentStatus();
  const supplierDetail = useGetSupplierDetail(
    supplierId ?? undefined,
    // openedEditForm || openedEditPaymentForm,
  );

  const handleUpdatePaymentStatus = (values: {
    paymentStatus: 'PAID' | 'UNPAID';
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
    const data = {
      discount: values.discount,
      supplierCompanyId: Number(values.supplierCompanyId),
      evidence: values.evidence,
      ppn: values.ppn,
      price: values.price,
      quantity: values.quantity,
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
        paymentStatus: 'UNPAID',
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

  useEffect(() => {
    if (updateSupplier.isSuccess) {
      setSupplierId(null);
      closeEdit();
    }
  }, [updateSupplier.isSuccess, closeEdit]);

  useEffect(() => {
    if (updatePaymentStatus.isSuccess) {
      setSelectedRows([]);
      closeEditPayment();
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
        {supplierDetail.isFetching ? (
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
          <Stack className="overflow-x-auto scrollbar-hide">
            <Table
              classNames={{
                th: `text-base `,
              }}
            >
              <TableDataHead data={tableHeadSuppliers} />

              {!props.suppliers ? null : (
                <TableDataBody
                  data={props.suppliers}
                  columns={[
                    {
                      key: 'checkbox',
                      render: (row) => (
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={(event) =>
                            setSelectedRows(
                              event.currentTarget.checked
                                ? [...selectedRows, row.id]
                                : selectedRows.filter((id) => id !== row.id),
                            )
                          }
                        />
                      ),
                    },

                    { key: 'no', render: (row) => <Text>{row.no}</Text> },
                    {
                      key: 'date',
                      render: (row) => <Text>{row.date}</Text>,
                    },
                    {
                      key: 'supplier',
                      render: (row) => <Text>{row.supplierCompany.name}</Text>,
                    },
                    {
                      key: 'evidence',
                      render: (row) => (
                        <Text className="text-nowrap">{row.evidence}</Text>
                      ),
                    },
                    {
                      key: 'quantity',
                      render: (row) => <Text>{row.quantity}</Text>,
                    },
                    {
                      key: 'price',
                      render: (row) => (
                        <CurrencyFormatter
                          currency="IDR"
                          value={row.price}
                          className="text-nowrap"
                        />
                      ),
                    },
                    {
                      key: 'discount',
                      render: (row) => <Text>{row.discount}%</Text>,
                    },
                    {
                      key: 'ppn',
                      render: (row) => (
                        <CurrencyFormatter currency="IDR" value={row.ppn} />
                      ),
                    },
                    {
                      key: 'service',
                      render: (row) => (
                        <CurrencyFormatter
                          currency="IDR"
                          value={row.totalAmount}
                        />
                      ),
                    },
                    {
                      key: 'status',
                      render: (row) => (
                        <UnstyledButton
                          onClick={() => handleOpenModalPaymentStatus(row.id)}
                        >
                          <PaymentStatusBadge
                            size="lg"
                            fullWidth
                            isPay={row.paymentStatus === 'PAID'}
                          >
                            {row.paymentStatus}
                          </PaymentStatusBadge>
                        </UnstyledButton>
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

export default SupplierEmployeePanel;
