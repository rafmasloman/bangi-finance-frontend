import { useMutation, useQueryClient } from '@tanstack/react-query';
import supplierService from '../SupplierService';
import { GET_ALL_SUPPLIERS_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierService.updateSupplier,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil mengubah Supplier ',
          title: 'Supplier  diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah Supplier ',
          title: 'Supplier  gagal diubah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_SUPPLIERS_DATA] });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah Supplier ',
        title: 'Supplier  gagal diubah',
        type: 'failed',
      });
    },
  });
};
