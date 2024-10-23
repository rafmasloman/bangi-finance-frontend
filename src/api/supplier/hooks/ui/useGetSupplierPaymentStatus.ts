import { useQuery } from '@tanstack/react-query';
import { GET_SUPPLIER_DETAIL_DATA } from '../../../../constants/query-key';
import supplierService from '../../SupplierService';

export const useGetSupplierPaymentStatus = (
  id?: string,
  isModalOpened?: boolean,
) => {
  const query = useQuery({
    queryKey: [GET_SUPPLIER_DETAIL_DATA, id],
    queryFn: () => supplierService.getDetailSupplier(id),
    select(data) {
      return {
        id: data.data.id,
        paymentStatus: data.data.paymentStatus,
      };
    },
    enabled: !!id && isModalOpened,
  });

  return query;
};
