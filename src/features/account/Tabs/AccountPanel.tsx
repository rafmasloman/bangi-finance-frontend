import { Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import AccountForm, {
  IUserAccountInitialValues,
} from '../components/AccountForm';
import { useGetUserAccount } from '../../../api/auth/hooks/useGetUserAccount';

const AccountPanel = () => {
  const { id } = useParams();

  const userDetail = useGetUserAccount(id);

  const handleSubmitAccount = (values: IUserAccountInitialValues) => {
    const payload = {
      email: values.email,
    };
    console.log('payload : ', payload);
  };

  if (userDetail.isLoading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Stack className="border-gray-300 rounded-2xl shadow-sm bg-white border p-7">
      <Stack gap={5}>
        <Text className="text-lg font-semibold">Account Settings</Text>
        <Text className="text-gray-400 font-medium">
          Update akun email dan password anda
        </Text>
      </Stack>

      <AccountForm
        handleSubmit={handleSubmitAccount}
        initialValues={userDetail.data}
      />
    </Stack>
  );
};

export default AccountPanel;
