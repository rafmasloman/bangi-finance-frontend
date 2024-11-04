import { Grid, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { useForm, zodResolver } from '@mantine/form';
import { IncomeFormSchema } from '../helpers/income.helper';
import BaseCurrencyInput from '../../../../shared/components/input/BaseCurrencyInput';
import { IIncomeRequestParams } from '../../../../api/income/IncomeInterface';
import dayjs from 'dayjs';

interface IIncomeFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: IIncomeRequestParams;
  loading?: boolean;
}

const IncomeForm = (props: IIncomeFormProps) => {
  const formIncome = useForm({
    initialValues: {
      date: dayjs(props.initialValues?.date).toDate() || undefined,
      itemSales: props.initialValues?.itemSales || undefined,
      itemDiscount: props.initialValues?.itemDiscount || undefined,
      billDiscount: props.initialValues?.billDiscount || undefined,
      focItem: props.initialValues?.focItem || undefined,
      focBill: props.initialValues?.focBill || undefined,
      service: props.initialValues?.service || undefined,
    },
    validate: zodResolver(IncomeFormSchema),
  });

  const handleSubmitForm = formIncome.onSubmit((values) =>
    props.handleSubmit(values),
  );

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <DateInput
            placeholder="Masukkan Tanggal"
            label="Tanggal"
            {...formIncome.getInputProps('date')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Item Sales"
            label="Item Sales"
            min={0}
            {...formIncome.getInputProps('itemSales')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Item Discount"
            label="Item Discount"
            min={0}
            {...formIncome.getInputProps('itemDiscount')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Bill Discount"
            label="Bill Discount"
            min={0}
            {...formIncome.getInputProps('billDiscount')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Foc Item"
            label="Foc Item"
            min={0}
            {...formIncome.getInputProps('focItem')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Foc Bill"
            label="Foc Bill"
            min={0}
            {...formIncome.getInputProps('focBill')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseCurrencyInput
            placeholder="Jumlah Service"
            label="Service"
            min={0}
            {...formIncome.getInputProps('service')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton btnVariant="primary" type="submit" loading={props.loading}>
          Input
        </BaseButton>
      </Group>
    </form>
  );
};

export default IncomeForm;
