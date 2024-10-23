import { useQuery } from '@tanstack/react-query';
import { GET_USER_DETAIL_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';

export const useGetUserDetail = (id?: string, openedEditModal?: boolean) => {
  const query = useQuery({
    queryKey: [GET_USER_DETAIL_DATA, id],
    queryFn: () => userServiceApi.getUserDetail(id),
    select(data) {
      return {
        id: data.data.id,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email,
        username: data.data.username,
        phoneNumber: data.data.phoneNumber,
        role: data.data.role,
      };
    },
    enabled: !!id && openedEditModal,
  });

  return query;
};
