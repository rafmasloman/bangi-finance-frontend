import { Grid, Group } from '@mantine/core';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { useForm } from '@mantine/form';
import BaseCurrencyInput from '../../../../shared/components/input/BaseCurrencyInput';
import { IHistoryResponseData } from '../../../../api/history/HistoryInterface';
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

interface IHistoryFormProps {
  handleSubmit: (data: any) => void;
  close?: () => void;
  initialValues?: IHistoryResponseData;
  loading?: boolean;
}

const HistoryForm = (props: IHistoryFormProps) => {
  const historyDataForm = useForm({
    initialValues: {
      remainingEmployeeService:
        props.initialValues?.remainingEmployeeService || undefined,
      remainingManagementService:
        props.initialValues?.remainingManagementService || undefined,
      remainingTax: props.initialValues?.remainingTax || undefined,
      remainingRawMaterials:
        props.initialValues?.remainingRawMaterials || undefined,
      // month: props.initialValues?.month || undefined,
      date: dayjs(props.initialValues?.date).toDate() || undefined,
    },
  });

  return (
    <form
      onSubmit={historyDataForm.onSubmit((values) =>
        props.handleSubmit(values),
      )}
    >
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <MonthPickerInput
            label="Pilih Bulan"
            placeholder="Pilih bulan untuk history"
            classNames={{
              root: ``,
            }}
            radius={'md'}
            {...historyDataForm.getInputProps('date')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <BaseCurrencyInput
            label="Sisa Service Karyawan Bulan Lalu"
            placeholder="Masukkan Sisa Service Karyawan"
            {...historyDataForm.getInputProps('remainingEmployeeService')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <BaseCurrencyInput
            label="Sisa Service Manajemen Bulan Lalu"
            placeholder="Masukkan Sisa Service Manajemen"
            {...historyDataForm.getInputProps('remainingManagementService')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            label="Sisa PPN Bulan lalu"
            placeholder="Masukkan Sisa PPN"
            {...historyDataForm.getInputProps('remainingTax')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            label="Sisa Bahan Baku Bulan lalu"
            placeholder="Masukkan Sisa Bahan Baku"
            {...historyDataForm.getInputProps('remainingRawMaterials')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton type="submit" loading={props.loading}>
          Input
        </BaseButton>
      </Group>
    </form>
  );
};

export default HistoryForm;
