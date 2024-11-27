import { useQuery } from '@tanstack/react-query';
import { GET_ALL_EXPENSE_DATA } from '../../../constants/query-key';
import expenseServiceApi from '../ExpenseService';
import moment from 'moment';
import { useParams } from 'react-router-dom';

export const useGetAllExpenses = (category?: string) => {
  const { historyId } = useParams();
  const query = useQuery({
    queryKey: [GET_ALL_EXPENSE_DATA, historyId, category],
    queryFn: () => expenseServiceApi.getAllExpenses(historyId, category),
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
          historis: {
            title: expense.histories.title,
          },
          user: {
            firstname: expense.user.firstname,
            lastname: expense.user.lastname,
          },
        };
      });
    },
  });

  return query;
};
