import { Navigate, Outlet } from 'react-router-dom';
import { useCredentialUser } from '../../api/auth/hooks/useCredentialUser';
import { Group, Loader } from '@mantine/core';
import ShowNotification from '../components/notifications/BaseNotification';

const RoleProtectedRoute = () => {
  const credential = useCredentialUser();

  console.log('credential : ', credential.data);

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

  // if (credential.isSuccess) {
  //   return <Navigate to={DIRECTOR_DASHBOARD_PAGE} />;
  // }

  if (credential.isSuccess && credential.data?.role !== 'DIRECTOR') {
    ShowNotification({
      message: 'Hanya bos yang dapat mengakses url tersebut',
      title: 'Byee',
      type: 'failed',
    });
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
