import { Stack, Text } from '@mantine/core';
import ProfileAccountForm, {
  IUserProfileInitialValues,
} from '../components/ProfileForm';
import { useParams } from 'react-router-dom';
import { useGetUserProfile } from '../../../api/auth/hooks/useGetProfileDetail';

const ProfilePanel = () => {
  const { id } = useParams();

  const userDetail = useGetUserProfile(id);

  const handleSubmitAccount = (values: IUserProfileInitialValues) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      phoneNumber: values.phoneNumber,
      username: values.username,
    };
    console.log('payload : ', payload);
  };

  if (userDetail.isLoading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Stack className="border-gray-300 rounded-2xl shadow-sm bg-white border p-7">
      <Stack gap={5}>
        <Text className="text-lg font-semibold">Personal Information</Text>
        <Text className="text-gray-400 font-medium">
          Update informasi akun anda pada halaman ini
        </Text>
      </Stack>

      <ProfileAccountForm
        handleSubmit={handleSubmitAccount}
        initialValues={userDetail.data}
      />
    </Stack>
  );
};

export default ProfilePanel;
