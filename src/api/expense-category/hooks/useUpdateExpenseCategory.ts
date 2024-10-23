import { useMutation, useQueryClient } from '@tanstack/react-query';
import expenseCategoryServiceApi from '../ExpenseCategoryService';
import { GET_ALL_EXPENSE_CATEGORIES_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategoryServiceApi.updateExpenseCategory,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah kategori pengeluaran',
          title: 'Kategori Pengeluaran diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah kategori pengeluaran',
          title: 'Kategori Pengeluaran gagal diubah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_CATEGORIES_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah kategori pengeluaran',
        title: 'Kategori Pengeluaran gagal diubah',
        type: 'failed',
      });
    },
  });
};
