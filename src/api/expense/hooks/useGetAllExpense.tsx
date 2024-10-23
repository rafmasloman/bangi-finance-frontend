import { useQuery } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';
import moment from 'moment';

export const useGetAllExpenses = () => {
  const query = useQuery({
    queryKey: [GET_ALL_EXPENSE_DATA],
    queryFn: () => expenseServiceApi.getAllExpenses(),
    select(data) {
      console.log('expense data : ', data.data);

      return data.data.expense.map((expense, index) => {
        return {
          id: expense.id,
          no: index + 1,
          evidence: expense.evidence,
          price: expense.price,
          date: moment(expense.date).format('DD MMMM YYYY'),
          expenseCategory: {
            id: expense.expenseCategory.id,
            name: expense.expenseCategory.name,
          },
          note: expense.note,
        };
      });
    },
  });

  console.log('query : ', query.error);

  return query;
};
