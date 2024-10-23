import { useMutation, useQueryClient } from '@tanstack/react-query';
import expenseCategoryServiceApi from '../ExpenseCategoryService';
import { GET_ALL_EXPENSE_CATEGORIES_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useDeleteExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategoryServiceApi.deleteExpenseCategory,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil menghapus kategori pengeluaran',
          title: 'Kategori berhasil dihapus',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menghapus kategori pengeluaran',
          title: 'Kategori gagal dihapus',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_CATEGORIES_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menghapus kategori pengeluaran',
        title: 'Kategori gagal dihapus',
        type: 'failed',
      });
    },
  });
};
