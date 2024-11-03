import { Navigate, Outlet } from 'react-router-dom';
import { useCredentialUser } from '../../api/auth/hooks/useCredentialUser';
import { Group, Loader } from '@mantine/core';
import ShowNotification from '../components/notifications/BaseNotification';

const ProtectedRoute = () => {
  const credential = useCredentialUser();

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

  if (!credential.data) {
    if (credential.isError) {
      ShowNotification({
        message: 'Sesi anda telah berakhir silahkan login kembali',
        title: 'Sesi berakhir',
        type: 'failed',
      });
    }
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
