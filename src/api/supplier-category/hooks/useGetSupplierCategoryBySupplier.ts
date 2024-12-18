import { useQuery } from "@tanstack/react-query";
import supplierCategoryApi from "../SupplierCategoryService";
import { GET_ALL_SUPPLIER_CATEGORY_BY_SUPPLIER_DATA } from "../../../constants/query-key";

export const useGetAllSupplierCategoryBySupplier = () => {
  const query = useQuery({
    queryKey: [GET_ALL_SUPPLIER_CATEGORY_BY_SUPPLIER_DATA],
    queryFn: () => supplierCategoryApi.getAllSupplierCategoryBySupplier(),
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
