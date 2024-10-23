import { useMutation, useQueryClient } from '@tanstack/react-query';
import expenseCategoryServiceApi from '../ExpenseCategoryService';
import { GET_ALL_EXPENSE_CATEGORIES_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useCreateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategoryServiceApi.createExpenseCategory,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah kategori pengeluaran',
          title: 'Kategori Pengeluaran ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah kategori pengeluaran',
          title: 'Kategori Pengeluaran gagal ditambah',
          type: 'failed',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_EXPENSE_CATEGORIES_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menghapus pengeluaran',
        title: 'Pengeluaran gagal dihapus',
        type: 'failed',
      });
    },
  });
};
