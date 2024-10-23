import { Grid, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import BaseButton from '../../../../../shared/components/button/BaseButton';
import { ExpenseCategoryFormSchema } from '../helpers/expense-category-helper';

interface IExpenseCategoryDetailInitialValues {
  name: string;
}

interface IExpenseCategoryFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: IExpenseCategoryDetailInitialValues;
}

const ExpenseCategoryForm = (props: IExpenseCategoryFormProps) => {
  console.log('initial values : ', props.initialValues);

  const expenseCategoryForm = useForm({
    initialValues: {
      name: props.initialValues?.name || '',
    },
    validate: zodResolver(ExpenseCategoryFormSchema),
  });

  const handleSubmitForm = expenseCategoryForm.onSubmit((values) =>
    props.handleSubmit(values),
  );

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <TextInput
            placeholder="Masukkan Kategori Pengeluaran"
            label="Nama Kategori"
            {...expenseCategoryForm.getInputProps('name')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton btnVariant="primary" type="submit">
          Input
        </BaseButton>
      </Group>
    </form>
  );
};

export default ExpenseCategoryForm;
