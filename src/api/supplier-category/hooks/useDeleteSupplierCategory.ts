import { useMutation, useQueryClient } from '@tanstack/react-query';
import supplierCategoryApi from '../SupplierCategoryService';
import { GET_ALL_SUPPLIER_CATEGORIES_DATA } from '../../../constants/query-key';

export const useDeleteSupplierCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierCategoryApi.deleteSupplierCategory,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SUPPLIER_CATEGORIES_DATA],
      });
    },
  });
};
