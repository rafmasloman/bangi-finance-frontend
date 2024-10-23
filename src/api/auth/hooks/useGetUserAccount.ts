import { useQuery } from '@tanstack/react-query';
import { GET_USER_ACCOUNT_DATA } from '../../../constants/query-key';
import userServiceApi from '../../user/UserService';

export const useGetUserAccount = (id?: string, openedEditModal?: boolean) => {
  const query = useQuery({
    queryKey: [GET_USER_ACCOUNT_DATA, id],
    queryFn: () => userServiceApi.getUserDetail(id),
    select(data) {
      return {
        id: data.data.id,
        email: data.data.email,
      };
    },
    enabled: !!id && openedEditModal,
  });

  return query;
};
