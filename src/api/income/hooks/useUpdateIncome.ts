import { useMutation, useQueryClient } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_ALL_INCOMES_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: incomeServiceApi.updateIncome,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil mengubah Income',
          title: 'Income diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah Income',
          title: 'Income gagal diubah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_INCOMES_DATA] });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah Income',
        title: 'Income gagal diubah',
        type: 'failed',
      });
    },
  });

  return mutation;
};
