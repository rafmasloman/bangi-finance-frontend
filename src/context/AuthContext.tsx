import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useCredentialUser } from '../api/auth/hooks/useCredentialUser';
import { IUserCredentialResponseData } from '../api/auth/AuthInterface';
import cookieLibs from '../libs/js-cookie/cookie';
import { Group, Loader } from '@mantine/core';

interface IUserContextProps {
  user?: IUserCredentialResponseData;
  isFetching?: boolean;
  isLoading?: boolean;
}

export const AuthContext = createContext<IUserContextProps>({
  user: undefined,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userCredential, setUserCredential] = useState<any>(null);
  const token = cookieLibs.getCookie('token');

  const credential = useCredentialUser({
    onSuccesCb(data) {
      setUserCredential(data);
    },
  });

  useEffect(() => {
    if (!token) {
      setUserCredential(undefined); // Set userCredential ke null jika token tidak ada
    } else {
      // Jika token ada dan userCredential masih null, maka coba ambil credential
      if (!userCredential) {
        credential.refetch();
      }
    }
  }, [token, credential, userCredential]);

  if (credential.isLoading) {
    return (
      <Group
        align="center"
        justify="center"
        className="w-full h-screen mx-auto"
      >
        <Loader
          classNames={{
            root: `text-primary`,
          }}
          color="yellow"
          type="bars"
        />
      </Group>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user: userCredential,
        isLoading: credential.isLoading,
        isFetching: credential.isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
