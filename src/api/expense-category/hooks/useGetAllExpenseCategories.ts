import { useQuery } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_CATEGORIES_DATA } from '../../../constants/query-key';
import expenseCategoryServiceApi from '../ExpenseCategoryService';

export const useGetAllExpensesCategories = () => {
  const query = useQuery({
    queryKey: [GET_ALL_EXPENSE_CATEGORIES_DATA],
    queryFn: () => expenseCategoryServiceApi.getAllExpenseCategories(),
    select(data) {
      return data.data.map((expense, index) => {
        return {
          no: index + 1,
          id: expense.id,
          name: expense.name,
        };
      });
    },
  });

  return query;
};