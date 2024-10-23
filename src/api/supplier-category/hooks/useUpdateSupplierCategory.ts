import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_ALL_SUPPLIER_CATEGORIES_DATA,
  GET_SUPPLIER__CATEGORY_DETAIL_DATA,
} from '../../../constants/query-key';
import supplierCategoryApi from '../SupplierCategoryService';

export const useUpdateSupplierCategory = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierCategoryApi.updateSupplierCategory,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SUPPLIER_CATEGORIES_DATA],
      });

      queryClient.invalidateQueries({
        queryKey: [GET_SUPPLIER__CATEGORY_DETAIL_DATA, id],
      });
    },
    onError(error, variables, context) {},
  });
};
