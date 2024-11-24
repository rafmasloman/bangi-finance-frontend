import { useQuery } from '@tanstack/react-query';
import authServiceApi from '../AuthService';
import cookieLibs from '../../../libs/js-cookie/cookie';
import { useEffect } from 'react';
import { GET_USER_CREDENTIAL } from '../../../constants/query-key';

interface IQueryCredentialOption {
  onSuccesCb?: (data: any) => void;
  onErrorCb?: () => void;
}

export const useCredentialUser = (options?: IQueryCredentialOption) => {
  const token = cookieLibs.getCookie('token');

  const query = useQuery({
    queryKey: [GET_USER_CREDENTIAL],
    queryFn: () => authServiceApi.credential(),
    select(data) {
      return data.data;
    },

    enabled: !!token,
  });

  useEffect(() => {
    if (options && !!options.onErrorCb) {
      options?.onErrorCb();
    }
  }, [options]);

  useEffect(() => {
    if (options && !!options.onSuccesCb) {
      options.onSuccesCb(query.data);
    }
  }, [options, query.data]);

  return query;
};
