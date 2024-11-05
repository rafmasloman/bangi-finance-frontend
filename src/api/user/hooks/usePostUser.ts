import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USERS_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useCreatePostUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userServiceApi.createUser,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah User ',
          title: 'User  ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah User ',
          title: 'User  gagal ditambah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_USERS_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menambah User ',
        title: 'User  gagal ditambah',
        type: 'failed',
      });
    },
  });
};
