import { useQuery } from '@tanstack/react-query';
import { GET_ALL_SUPPLIERS_DATA } from '../../../../constants/query-key';
import supplierService from '../../SupplierService';

export const useGetSupplierTotal = () => {
  const query = useQuery({
    queryKey: [GET_ALL_SUPPLIERS_DATA],
    queryFn: () => supplierService.getAllSuppliers(),
    select(data) {
      return {
        totalSupplier: data.data.totalSupplier,
      };
    },
  });

  return query;
};
