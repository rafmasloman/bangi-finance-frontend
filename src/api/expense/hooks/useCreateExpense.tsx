import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseServiceApi.createExpense,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah  pengeluaran',
          title: ' Pengeluaran ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah  pengeluaran',
          title: ' Pengeluaran gagal ditambah',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menambah  pengeluaran',
        title: ' Pengeluaran gagal ditambah',
        type: 'failed',
      });
    },
  });
};
