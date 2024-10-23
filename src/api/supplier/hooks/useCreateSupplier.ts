import { useMutation, useQueryClient } from '@tanstack/react-query';
import supplierService from '../SupplierService';
import { GET_ALL_SUPPLIERS_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supplierService.createSupplier,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah Supplier buku',
          title: 'Supplier buku ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah Supplier buku',
          title: 'Supplier buku gagal ditambah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_SUPPLIERS_DATA] });
    },
    onError() {
      ShowNotification({
        message: 'Gagal menambah Supplier buku',
        title: 'Supplier buku gagal ditambah',
        type: 'failed',
      });
    },
  });
};
