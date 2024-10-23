import { Grid, Group, TextInput } from '@mantine/core';
import BaseButton from '../../../shared/components/button/BaseButton';
import { useForm } from '@mantine/form';

export interface IUserProfileInitialValues {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
}

interface IProfileAccountFormProps {
  handleSubmit: (data: any) => void;
  close?: () => void;
  initialValues?: IUserProfileInitialValues;
}

const ProfileAccountForm = (props: IProfileAccountFormProps) => {
  const userProfileAccountForm = useForm({
    initialValues: {
      firstname: props.initialValues?.firstname || '',
      lastname: props.initialValues?.lastname || '',
      password: '',
      phoneNumber: props.initialValues?.phoneNumber || '',
      username: props.initialValues?.username || '',
    },
  });

  return (
    <form
      onSubmit={userProfileAccountForm.onSubmit((values) =>
        props.handleSubmit(values),
      )}
    >
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Nama Depan"
            label="Nama Depan"
            {...userProfileAccountForm.getInputProps('firstname')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Nama Belakang"
            label="Nama Belakang"
            {...userProfileAccountForm.getInputProps('lastname')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan Username"
            label="Username"
            {...userProfileAccountForm.getInputProps('username')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Masukkan No. Telp"
            label="No Hp/Whatsapp"
            type="number"
            {...userProfileAccountForm.getInputProps('phoneNumber')}
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

export default ProfileAccountForm;
