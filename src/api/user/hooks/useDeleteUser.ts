import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USERS_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userServiceApi.deleteUser,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil menghapus User ',
          title: 'User  dihapus',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menghapus User ',
          title: 'User  gagal dihapus',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_USERS_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menghapus User ',
        title: 'User  gagal dihapus',
        type: 'failed',
      });
    },
  });
};
