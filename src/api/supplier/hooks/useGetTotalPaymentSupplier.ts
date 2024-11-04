import { useQuery } from '@tanstack/react-query';
import supplierService from '../SupplierService';
import { GET_SUPPLIER_PAYMENT_TOTAL_DATA } from '../../../constants/query-key';

export const useGetTotalPaymentSupplier = (historyId?: string) => {
  const query = useQuery({
    queryKey: [GET_SUPPLIER_PAYMENT_TOTAL_DATA, historyId],
    queryFn: () => supplierService.getTotalPaidSupplier(historyId),
    select(data) {
      return {
        paymentStatusAmount: data.data.paymentStatusAmount,
        totalPaid: data.data.totalPaid,
        totalUnpaid: data.data.totalUnpaid,
      };
    },
  });

  return query;
};
