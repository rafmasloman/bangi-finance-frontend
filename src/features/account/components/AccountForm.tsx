import { Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import BaseButton from '../../../shared/components/button/BaseButton';
import { useForm } from '@mantine/form';

export interface IUserAccountInitialValues {
  email: string;
}

interface IAccountFormProps {
  handleSubmit: (data: any) => void;
  close?: () => void;
  initialValues?: IUserAccountInitialValues;
}

const AccountForm = (props: IAccountFormProps) => {
  const userAccountForm = useForm({
    initialValues: {
      email: props.initialValues?.email || '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={userAccountForm.onSubmit((values) =>
        props.handleSubmit(values),
      )}
    >
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Email"
            label="Email"
            {...userAccountForm.getInputProps('email')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <PasswordInput
            placeholder="Masukkan Password"
            label="Password"
            {...userAccountForm.getInputProps('password')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton type="submit">Simpan</BaseButton>
      </Group>
    </form>
  );
};

export default AccountForm;
