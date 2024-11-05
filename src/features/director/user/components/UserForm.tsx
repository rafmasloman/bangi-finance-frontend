import { Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { createUserSchema, updateUserSchema } from '../helpers/user.helper';
import BaseButton from '../../../../shared/components/button/BaseButton';

interface IUserDetailInitialValues {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
  username: string;
}

interface IUserFormProps {
  close?: () => void;
  handleSubmit: (data: any) => void;
  initialValues?: IUserDetailInitialValues;
  loading?: boolean;
}

const UserForm = (props: IUserFormProps) => {
  console.log('props : ', props.initialValues);

  const userForm = useForm({
    initialValues: {
      firstname: props.initialValues?.firstname || '',
      lastname: props.initialValues?.lastname || '',
      email: props.initialValues?.email || '',
      password: undefined,
      phoneNumber: props.initialValues?.phoneNumber || '',
      username: props.initialValues?.username || '',
      role: props.initialValues?.role || 'EMPLOYEE',
    },
    validate: zodResolver(
      !props.initialValues ? createUserSchema : updateUserSchema,
    ),
  });

  const handleSubmitForm = userForm.onSubmit((values) =>
    props.handleSubmit(values),
  );

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Nama Depan"
            label="Nama Depan"
            {...userForm.getInputProps('firstname')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Nama Belakang"
            label="Nama Belakang"
            {...userForm.getInputProps('lastname')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Email"
            label="Email"
            {...userForm.getInputProps('email')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Username"
            label="Username"
            {...userForm.getInputProps('username')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan No. Telp"
            label="No Hp/Whatsapp"
            type="number"
            {...userForm.getInputProps('phoneNumber')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <PasswordInput
            placeholder={
              !props.initialValues
                ? 'Masukkan Password'
                : 'Kosongkan jika tidak ingin ubah password'
            }
            label="Password"
            {...userForm.getInputProps('password')}
            withAsterisk={!props.initialValues ? true : false}
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

export default UserForm;
