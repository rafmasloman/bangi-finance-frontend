import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_HISTORIES_DATA } from '../../../constants/query-key';
import historyServiceApi from '../HistoryService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateHistory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: historyServiceApi.updateHistory,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah history buku',
          title: 'History buku diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah history buku',
          title: 'History buku gagal diubah',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({ queryKey: [GET_ALL_HISTORIES_DATA] });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah history buku',
        title: 'History buku gagal diubah',
        type: 'failed',
      });
    },
  });

  return mutation;
};
