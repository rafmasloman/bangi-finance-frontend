import { Button, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import LoginForm from '../../../features/auth/components/LoginForm';
import { useLoginMutation } from '../../../api/auth/hooks/useLoginMutation';
import { ILoginInterfacePropsType } from '../../../features/auth/interfaces/AuthInterfaces';
import { LogoBangi } from '../../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import cookieLibs from '../../../libs/js-cookie/cookie';
import {
  ADMIN_HISTORY_PAGE,
  DIRECTOR_HISTORY_PAGE,
} from '../../../constants/pages-route';
import { useEffect } from 'react';
import { useCredentialUser } from '../../../api/auth/hooks/useCredentialUser';

const LoginPage = () => {
  const loginMutation = useLoginMutation();
  const token = cookieLibs.getCookie('token');
  const navigate = useNavigate();

  const credential = useCredentialUser();

  const handleSubmitForm = (values: ILoginInterfacePropsType) => {
    loginMutation.mutate(values);
  };

  useEffect(() => {
    if (!!credential.data && !!token) {
      if (credential.data.role !== 'EMPLOYEE') {
        navigate(DIRECTOR_HISTORY_PAGE);
      } else {
        navigate(ADMIN_HISTORY_PAGE);
      }
    }
  }, [credential.data, navigate, token]);

  return (
    <Stack className="container mx-auto h-screen">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} className="h-full p-5">
        <Stack
          gap={30}
          className="px-0 md:px-20  lg:px-10 xl:px-36 "
          justify=" center"
        >
          <Stack gap={10}>
            <Group align="center" justify="center">
              <Image src={LogoBangi} className="w-full h-12 mb-10" />
            </Group>
            <Text className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Welcome to Bangi Finance
            </Text>
            <Text className="text-neutral-400  text-sm md:text-base">
              Masuk ke akun anda untuk dapat mengelola financial bangi cafe
              sunset
            </Text>
          </Stack>

          <LoginForm handleSubmit={handleSubmitForm} />

          <Group justify="center">
            <Button
              component={Link}
              to={`${DIRECTOR_HISTORY_PAGE}`}
              variant="transparent"
              bg={'transparent'}
              disabled={!token ? true : false}
              className={`underline text-base ${
                !token ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600'
              }  font-normal`}
            >
              Launch Dashboard
            </Button>
          </Group>
        </Stack>

        <Stack
          className={`bg-black_primary hidden lg:block  h-full w-full rounded-3xl`}
        >
          {/* <Image className="h-fit" src={LoginBackground} /> */}
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default LoginPage;
