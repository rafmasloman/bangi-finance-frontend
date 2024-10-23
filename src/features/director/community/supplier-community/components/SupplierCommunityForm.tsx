import { Grid, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import BaseButton from '../../../../../shared/components/button/BaseButton';
import { SupplierCommunityFormSchema } from '../helpers/supplier-community-helper';

interface ISupplierCategoryDetailInitialValues {
  name: string;
}

interface ISupplierCommunityFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: ISupplierCategoryDetailInitialValues;
}

const SupplierCommunityForm = (props: ISupplierCommunityFormProps) => {
  const supplierCommunityForm = useForm({
    initialValues: {
      name: props.initialValues?.name || '',
    },
    validate: zodResolver(SupplierCommunityFormSchema),
  });

  const handleSubmitForm = supplierCommunityForm.onSubmit((values) =>
    props.handleSubmit(values),
  );

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <TextInput
            placeholder="Masukkan Nama Supplier"
            label="Nama Supplier"
            {...supplierCommunityForm.getInputProps('name')}
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

export default SupplierCommunityForm;
