import { useMutation, useQueryClient } from '@tanstack/react-query';
import supplierService from '../SupplierService';
import {
  GET_ALL_SUPPLIERS_DATA,
  GET_SUPPLIER_PAYMENT_TOTAL_DATA,
} from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useUpdateSupplierPaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierService.updateSupplierPaymentStatus,
    onSuccess(data) {
      if (data.statusCode === 200) {
        ShowNotification({
          message: 'Berhasil mengubah Supplier Status',
          title: 'Supplier Status diubah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal mengubah Supplier Status',
          title: 'Supplier Status gagal diubah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_SUPPLIERS_DATA] });
      queryClient.invalidateQueries({
        queryKey: [GET_SUPPLIER_PAYMENT_TOTAL_DATA],
      });
    },
    onError() {
      ShowNotification({
        message: 'Gagal mengubah Supplier Status',
        title: 'Supplier Status gagal diubah',
        type: 'failed',
      });
    },
  });
};
