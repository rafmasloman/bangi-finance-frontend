import { useQuery } from '@tanstack/react-query';
import supplierCategoryApi from '../SupplierCategoryService';
import { GET_ALL_SUPPLIER_CATEGORIES_DATA } from '../../../constants/query-key';

export const useGetAllSupplierCategory = () => {
  const query = useQuery({
    queryKey: [GET_ALL_SUPPLIER_CATEGORIES_DATA],
    queryFn: () => supplierCategoryApi.getAllSupplierCategories(),
    select(data) {
      return data.data.map((ctx, index) => {
        return {
          no: index + 1,
          id: ctx.id,
          name: ctx.name,
        };
      });
    },
  });

  return query;
};
