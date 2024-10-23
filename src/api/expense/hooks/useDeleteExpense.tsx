import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseServiceApi.deleteExpense,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil menghapus  pengeluaran',
          title: 'Pengeluaran berhasil dihapus',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menghapus  pengeluaran',
          title: 'Pengeluaran gagal dihapus',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menghapus  pengeluaran',
        title: 'Pengeluaran gagal dihapus',
        type: 'failed',
      });
    },
  });
};
