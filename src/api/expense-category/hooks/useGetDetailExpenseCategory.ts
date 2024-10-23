import { useQuery } from '@tanstack/react-query';
import { GET_EXPENSE_CATEGORY_DETAIL_DATA } from '../../../constants/query-key';
import expenseCategoryServiceApi from '../ExpenseCategoryService';

export const useGetDetailExpensesCategory = (
  id?: string,
  isModalOpened?: boolean,
) => {
  const query = useQuery({
    queryKey: [GET_EXPENSE_CATEGORY_DETAIL_DATA, id],
    queryFn: () => expenseCategoryServiceApi.getDetailExpenseCategory(id),
    select(data) {
      return {
        id: data.data.id,
        name: data.data.name,
      };
    },
    enabled: !!id && isModalOpened,
  });

  return query;
};
