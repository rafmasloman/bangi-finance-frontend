import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USERS_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userServiceApi.updateUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_USERS_DATA],
      });
    },
    onError() {},
  });
};
