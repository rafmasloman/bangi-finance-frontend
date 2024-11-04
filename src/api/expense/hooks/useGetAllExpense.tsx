import { useQuery } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';
import moment from 'moment';

export const useGetAllExpenses = () => {
  const query = useQuery({
    queryKey: [GET_ALL_EXPENSE_DATA],
    queryFn: () => expenseServiceApi.getAllExpenses(),
    select(data) {
      return data.data.expense.map((expense, index) => {
        return {
          id: expense.id,
          no: index + 1,
          evidence: expense.evidence,
          price: expense.price,
          date: moment(expense.date).format('DD MMMM YYYY'),
          expenseCategory: expense.expenseCategory,
          note: expense.note,
        };
      });
    },
  });

  return query;
};
