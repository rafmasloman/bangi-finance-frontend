import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_ALL_EXPENSE_CATEGORIES_DATA,
  GET_ALL_EXPENSE_DATA,
} from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';
import expenseServiceApi from '../ExpenseService';

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseServiceApi.updateExpense,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah pengeluaran',
          title: 'Pengeluaran diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah pengeluaran',
          title: 'Pengeluaran gagal diubah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah pengeluaran',
        title: 'Pengeluaran gagal diubah',
        type: 'failed',
      });
    },
  });
};
