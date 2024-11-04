import { useQuery } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_CATEGORIES_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';

export const useGetExpenseCategories = () => {
  const query = useQuery({
    queryKey: [GET_ALL_EXPENSE_CATEGORIES_DATA],
    queryFn: () => expenseServiceApi.getExpenseCategories(),
    select(data) {
      return data.data.map((ctx, index) => {
        return {
          no: index + 1,
          category: ctx,
        };
      });
    },
  });

  return query;
};
