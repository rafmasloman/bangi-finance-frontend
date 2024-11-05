import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USERS_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userServiceApi.updateUser,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah User ',
          title: 'User  diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah User ',
          title: 'User  gagal diubah',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_USERS_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah User ',
        title: 'User  gagal diubah',
        type: 'failed',
      });
    },
  });
};
