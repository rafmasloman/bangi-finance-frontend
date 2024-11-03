import { useQuery } from '@tanstack/react-query';
import { GET_EXPENSE_DETAIL_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';

export const useGetDetailExpenses = (id?: string, isModalOpened?: boolean) => {
  const query = useQuery({
    queryKey: [GET_EXPENSE_DETAIL_DATA, id],
    queryFn: () => expenseServiceApi.getDetailExpense(id),
    select(data) {
      return {
        id: data.data.id,
        evidence: data.data.evidence,
        price: data.data.price,
        date: data.data.date,
        expenseCategory: data.data.expenseCategory,
        note: data.data.note,
      };
    },
    enabled: !!id && isModalOpened,
  });

  return query;
};
