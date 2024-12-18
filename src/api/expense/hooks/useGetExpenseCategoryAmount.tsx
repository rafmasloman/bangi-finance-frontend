import { useQuery } from '@tanstack/react-query';
import { GET_EXPENSE_CATEGORY_AMOUNT_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';

export const useGetExpenseCategoryAmount = (
  categoryName: string,
  id?: string,
) => {
  const query = useQuery({
    queryKey: [GET_EXPENSE_CATEGORY_AMOUNT_DATA, categoryName],
    queryFn: () => expenseServiceApi.getExpenseCategoryAmount(categoryName, id),
    select(data) {
      return {
        expense: data.data.expense.map((ctx) => ({
          category: ctx.category,
          amount: ctx.amount,
        })),
        totalExpense: data.data.totalExpense,
      };
    },
    enabled: !!id && !!categoryName,
  });

  return query;
};
