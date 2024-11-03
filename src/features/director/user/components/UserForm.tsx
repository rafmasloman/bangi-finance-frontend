import { Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserFormSchema } from '../helpers/user.helper';
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
}

const UserForm = (props: IUserFormProps) => {
  const userForm = useForm({
    initialValues: {
      firstname: props.initialValues?.firstname || '',
      lastname: props.initialValues?.lastname || '',
      email: props.initialValues?.email || '',
      password: '',
      phoneNumber: props.initialValues?.phoneNumber || '',
      username: props.initialValues?.username || '',
    },
    validate: zodResolver(UserFormSchema),
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
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Nama Belakang"
            label="Nama Belakang"
            {...userForm.getInputProps('lastname')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Email"
            label="Email"
            {...userForm.getInputProps('email')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Username"
            label="Username"
            {...userForm.getInputProps('username')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan No. Telp"
            label="No Hp/Whatsapp"
            type="number"
            {...userForm.getInputProps('phoneNumber')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          {!props.initialValues ? (
            <PasswordInput
              placeholder="Masukkan Password"
              label="Password"
              {...userForm.getInputProps('password')}
            />
          ) : null}
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton btnVariant="primary" type="submit">
          Tambah
        </BaseButton>
      </Group>
    </form>
  );
};

export default UserForm;
