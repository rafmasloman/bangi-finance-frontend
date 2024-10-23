import { useQuery } from '@tanstack/react-query';
import { GET_SUPPLIER__CATEGORY_DETAIL_DATA } from '../../../constants/query-key';
import supplierCategoryApi from '../SupplierCategoryService';

export const useGetDetailSupplierCompany = (
  id?: string,
  openedEditModal?: boolean,
) => {
  const query = useQuery({
    queryKey: [GET_SUPPLIER__CATEGORY_DETAIL_DATA, id],
    queryFn: () => supplierCategoryApi.getSupplierCategory(id),
    select(data) {
      return {
        id: data.data.id,
        name: data.data.name,
      };
    },
    enabled: !!id && openedEditModal,
  });

  return query;
};
