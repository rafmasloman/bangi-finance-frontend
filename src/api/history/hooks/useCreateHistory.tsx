import { useMutation, useQueryClient } from '@tanstack/react-query';
import historyServiceApi from '../HistoryService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';
import { GET_ALL_HISTORIES_DATA } from '../../../constants/query-key';

export const useCreateHistory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: historyServiceApi.createHistory,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah history buku',
          title: 'History buku ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah history buku',
          title: 'History buku gagal ditambah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_HISTORIES_DATA] });
    },
    onError(error) {
      ShowNotification({
        message: 'Gagal menambah history buku',
        title: 'History buku gagal ditambah',
        type: 'failed',
      });
    },
  });

  return mutation;
};
