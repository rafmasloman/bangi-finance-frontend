import { useMutation, useQueryClient } from '@tanstack/react-query';
import authServiceApi from '../AuthService';
import cookieLibs from '../../../libs/js-cookie/cookie';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';
import { GET_USER_CREDENTIAL } from '../../../constants/query-key';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authServiceApi.login,
    onSuccess(data) {
      if (data.statusCode !== 201 && !data.data) {
        ShowNotification({
          message: 'Login Gagal',
          title: 'Username atau password salah',
          type: 'failed',
        });
      } else {
        cookieLibs.setCookie('token', data.data.token);

        console.log('token : ', cookieLibs.getCookie('token'));

        ShowNotification({
          message: 'Login Berhasil',
          title: 'Silahkan klik tombol go to dashboard',
          type: 'success',
        });
        queryClient.invalidateQueries({
          queryKey: [GET_USER_CREDENTIAL],
        });

        // navigate(DIRECTOR_HISTORY_PAGE);
      }
    },
    onError() {
      ShowNotification({
        message: 'Login Gagal',
        title: 'Username atau password salah',
        type: 'failed',
      });
    },
  });
};
