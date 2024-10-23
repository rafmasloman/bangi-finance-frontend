import { useQuery } from '@tanstack/react-query';
import { GET_USER_PROFILE_DATA } from '../../../constants/query-key';
import userServiceApi from '../../user/UserService';

export const useGetUserProfile = (id?: string, openedEditModal?: boolean) => {
  const query = useQuery({
    queryKey: [GET_USER_PROFILE_DATA, id],
    queryFn: () => userServiceApi.getUserDetail(id),
    select(data) {
      return {
        id: data.data.id,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        username: data.data.username,
        phoneNumber: data.data.phoneNumber,
      };
    },
    enabled: !!id && openedEditModal,
  });

  return query;
};
