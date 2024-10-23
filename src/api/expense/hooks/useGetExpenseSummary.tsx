import { useQuery } from '@tanstack/react-query';
import { GET_EXPENSE_SUMMARY_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';

export const useGetExpenseSummary = (id?: string) => {
  const query = useQuery({
    queryKey: [GET_EXPENSE_SUMMARY_DATA, id],
    queryFn: () => expenseServiceApi.getExpenseSummary(id),
    select(data) {
      return data.data;
    },
    enabled: !!id,
  });

  return query;
};
