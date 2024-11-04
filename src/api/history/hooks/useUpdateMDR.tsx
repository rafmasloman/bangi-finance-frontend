import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_ALL_HISTORIES_DATA,
  GET_MDR_DATA,
} from '../../../constants/query-key';
import historyServiceApi from '../HistoryService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateMDR = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: historyServiceApi.updateMDR,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah MDR',
          title: 'MDR diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah MDR',
          title: 'MDR gagal diubah',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({ queryKey: [GET_ALL_HISTORIES_DATA] });
      queryClient.invalidateQueries({ queryKey: [GET_MDR_DATA] });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah MDR',
        title: 'MDR gagal diubah',
        type: 'failed',
      });
    },
  });

  return mutation;
};
