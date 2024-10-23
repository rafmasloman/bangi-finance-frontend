import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { MdAlternateEmail } from 'react-icons/md';
import BaseButton from '../../../shared/components/button/BaseButton';
import { useForm, zodResolver } from '@mantine/form';
import { LoginSchema } from '../helpers/login.helper';

interface ILoginFormPropsType {
  handleSubmit: (data: any) => void;
}

const LoginForm = (props: ILoginFormPropsType) => {
  const loginFormData = useForm({
    initialValues: {
      //   username: '',
      email: '',
      password: '',
    },
    validate: zodResolver(LoginSchema),
  });

  return (
    <form
      onSubmit={loginFormData.onSubmit((values) => props.handleSubmit(values))}
    >
      <Stack gap={20} className="mb-12">
        <TextInput
          placeholder="Masukkan Email"
          label="Email"
          rightSection={<MdAlternateEmail />}
          classNames={{
            label: `text-base`,
          }}
          {...loginFormData.getInputProps('email')}
          withAsterisk
        />
        <PasswordInput
          placeholder="Masukkan Password"
          label="Password"
          {...loginFormData.getInputProps('password')}
          withAsterisk
        />
      </Stack>

      <BaseButton fullWidth type="submit" variant="primary">
        Login
      </BaseButton>
    </form>
  );
};

export default LoginForm;
