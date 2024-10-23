import { useQuery } from '@tanstack/react-query';
import { GET_ALL_USERS_DATA } from '../../../constants/query-key';
import userServiceApi from '../UserService';

export const useGetAllUsers = () => {
  const query = useQuery({
    queryKey: [GET_ALL_USERS_DATA],
    queryFn: () => userServiceApi.getAllUsers(),
    select(data) {
      return data.data.map((ctx, index) => {
        return {
          no: index + 1,
          id: ctx.id,
          firstname: ctx.firstname,
          lastname: ctx.lastname,
          email: ctx.email,
          phoneNumber: ctx.phoneNumber,
          username: ctx.username,
        };
      });
    },
  });

  return query;
};
