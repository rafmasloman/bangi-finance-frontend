import { Grid, Group, Select, Text } from '@mantine/core';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { HiPlus } from 'react-icons/hi';
import { useGetAllSupplierCategory } from '../../../../api/supplier-category/hooks/useGetAllSupplierCategory';
import { useForm, zodResolver } from '@mantine/form';
import { SupplierPaymentInputSchema } from '../helpers/supplier.helper';

interface ISupplierPaymentStatusFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: { paymentStatus?: string };
}

const SupplierPaymentStatusForm = (props: ISupplierPaymentStatusFormProps) => {
  const supplierCategories = useGetAllSupplierCategory();

  const supplierPaymentForm = useForm({
    initialValues: {
      paymentStatus: props.initialValues?.paymentStatus,
    },
    validate: zodResolver(SupplierPaymentInputSchema),
  });

  if (!supplierCategories.data) {
    return <Text>Loading...</Text>;
  }

  return (
    <form
      onSubmit={supplierPaymentForm.onSubmit((values) =>
        props.handleSubmit(values),
      )}
    >
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <Select
            placeholder="Pilih Status Payment"
            label="Status Payment"
            data={['PAID', 'UNPAID']}
            {...supplierPaymentForm.getInputProps('paymentStatus')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton type="submit" leftSection={<HiPlus />}>
          Input
        </BaseButton>
      </Group>
    </form>
  );
};

export default SupplierPaymentStatusForm;
