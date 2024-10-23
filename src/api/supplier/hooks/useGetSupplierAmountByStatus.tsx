import { useQuery } from '@tanstack/react-query';
import supplierService from '../SupplierService';
import { GET_SUPPLIER_TOTAL_AMOUNT_PAYMENT_STATUS_DATA } from '../../../constants/query-key';
import { useParams } from 'react-router-dom';

export const useGetSupplierAmountByPaymentStatus = (paymentStatus?: string) => {
  const { historyId } = useParams();
  const query = useQuery({
    queryKey: [GET_SUPPLIER_TOTAL_AMOUNT_PAYMENT_STATUS_DATA, paymentStatus],
    queryFn: () =>
      supplierService.getSupplierAmountByStatus(historyId, paymentStatus),
    select(data) {
      return {
        payment: data.data.payment.map((pay, index) => {
          return {
            no: index + 1,
            name: pay.name,
            totalAmount: pay.totalAmount,
          };
        }),
        totalPayment: data.data.totalPayment,
      };
    },
    enabled: !!historyId,
  });

  return query;
};
