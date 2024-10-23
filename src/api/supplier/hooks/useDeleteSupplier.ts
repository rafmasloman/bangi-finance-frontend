import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_SUPPLIERS_DATA } from '../../../constants/query-key';
import supplierService from '../SupplierService';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierService.deleteSupplier,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil menghapus Supplier buku',
          title: 'Supplier buku dihapus',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menghapus Supplier buku',
          title: 'Supplier buku gagal dihapus',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SUPPLIERS_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menghapus Supplier buku',
        title: 'Supplier buku gagal dihapus',
        type: 'failed',
      });
    },
  });
};
