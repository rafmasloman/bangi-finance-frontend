import { Grid, Group, NumberInput, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import BaseButton from '../../../../shared/components/button/BaseButton';
import BaseTextInput from '../../../../shared/components/input/BaseTextInput';
import { useForm } from '@mantine/form';
import BaseCurrencyInput from '../../../../shared/components/input/BaseCurrencyInput';
import {
  IExpenseResponseData,
  IExpenseResponseDetailData,
} from '../../../../api/expense/ExpenseInterface';
import dayjs from 'dayjs';
import { useGetAllHistories } from '../../../../api/history/hooks/useGetAllHistories';
import { useGetExpenseCategories } from '../../../../api/expense/hooks/useGetExpenseCategories';

interface IExpenseFormProps {
  handleSubmit: (data: any) => void;
  close?: () => void;
  initialValues?: IExpenseResponseDetailData;
}

const ExpenseForm = (props: IExpenseFormProps) => {
  const expenseCategories = useGetExpenseCategories();
  const historiesData = useGetAllHistories();

  const expenseDataForm = useForm({
    initialValues: {
      evidence: props.initialValues?.evidence || '',
      price: props.initialValues?.price || 0,
      date: dayjs(props.initialValues?.date).toDate() || undefined,
      expenseCategoryId: props.initialValues?.expenseCategory || undefined,
      note: props.initialValues?.note || '',
    },
  });

  return (
    <form
      onSubmit={expenseDataForm.onSubmit((values) =>
        props.handleSubmit(values),
      )}
    >
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <BaseTextInput
            placeholder="Masukkan Keterangan"
            label="Keterangan"
            {...expenseDataForm.getInputProps('evidence')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Masukkan Jumlah"
            label="Jumlah"
            {...expenseDataForm.getInputProps('price')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DateInput
            placeholder="Masukkan Tanggal"
            label="Tanggal"
            {...expenseDataForm.getInputProps('date')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Select
            placeholder="Pilih Kategori"
            label="Kategori"
            data={expenseCategories.data?.map((category) => {
              return {
                label: category.category,
                value: category.category,
              };
            })}
            {...expenseDataForm.getInputProps('expenseCategoryId')}
          />
        </Grid.Col>

        <Grid.Col>
          <Textarea
            placeholder="Masukan Catatan"
            label="Note"
            {...expenseDataForm.getInputProps('note')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton type="submit">Input</BaseButton>
      </Group>
    </form>
  );
};

export default ExpenseForm;
