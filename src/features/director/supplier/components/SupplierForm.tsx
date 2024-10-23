import { Grid, Group, NumberInput, Select, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import BaseButton from '../../../../shared/components/button/BaseButton';
import BaseTextInput from '../../../../shared/components/input/BaseTextInput';
import { HiPlus } from 'react-icons/hi';
import { useGetAllSupplierCategory } from '../../../../api/supplier-category/hooks/useGetAllSupplierCategory';
import { useForm, zodResolver } from '@mantine/form';
import { SupplierInputSchema } from '../helpers/supplier.helper';
import { ISupplierResponseDetailData } from '../../../../api/supplier/SupplierApiInterface';
import BaseCurrencyInput from '../../../../shared/components/input/BaseCurrencyInput';

interface ISupplierFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: ISupplierResponseDetailData;
}

const SupplierForm = (props: ISupplierFormProps) => {
  const supplierCategories = useGetAllSupplierCategory();

  const supplierForm = useForm({
    initialValues: {
      date: dayjs(props.initialValues?.date).toDate() || undefined,
      supplierCompanyId:
        props.initialValues?.supplierCompany.id.toString() || undefined,
      evidence: props.initialValues?.evidence || '',
      quantity: props.initialValues?.quantity || 0,
      price: props.initialValues?.price || 0,
      discount: props.initialValues?.discount || 0,
      ppn: props.initialValues?.ppn || 0,
      status: props.initialValues?.paymentStatus || '',
    },
    validate: zodResolver(SupplierInputSchema),
  });

  if (!supplierCategories.data) {
    return <Text>Loading...</Text>;
  }

  return (
    <form
      onSubmit={supplierForm.onSubmit((values) => props.handleSubmit(values))}
    >
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <Select
            placeholder="Pilih Supplier"
            label="Supplier"
            data={supplierCategories.data.map((supplier) => {
              return {
                label: supplier.name,
                value: supplier.id.toString(),
              };
            })}
            {...supplierForm.getInputProps('supplierCompanyId')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <NumberInput
            placeholder="Masukkan Jumlah"
            label="Jumlah"
            {...supplierForm.getInputProps('quantity')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DatePickerInput
            placeholder="Masukkan Tanggal"
            label="Tanggal"
            valueFormat={'DD MMMM YY'}
            {...supplierForm.getInputProps('date')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <BaseTextInput
            placeholder="Masukkan Keterangan"
            label="Keterangan"
            {...supplierForm.getInputProps('evidence')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Masukkan Harga"
            label="Harga"
            {...supplierForm.getInputProps('price')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <NumberInput
            placeholder="Masukkan Discount"
            label="Discount"
            {...supplierForm.getInputProps('discount')}
          />
        </Grid.Col>

        <Grid.Col>
          <BaseCurrencyInput
            placeholder="Masukan PPN"
            label="PPN"
            {...supplierForm.getInputProps('ppn')}
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

export default SupplierForm;
