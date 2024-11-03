import { useMutation, useQueryClient } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_ALL_INCOMES_DATA } from '../../../constants/query-key';

export const useDeleteIncome = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: incomeServiceApi.deleteIncome,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_INCOMES_DATA] });
    },
  });

  return mutation;
};
