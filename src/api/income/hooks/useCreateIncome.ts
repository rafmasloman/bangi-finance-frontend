import { useMutation, useQueryClient } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_ALL_INCOMES_DATA } from '../../../constants/query-key';
import ShowNotification from '../../../shared/components/notifications/BaseNotification';

export const useCreateIncome = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: incomeServiceApi.createIncome,
    onSuccess(data) {
      if (data.statusCode === 201) {
        ShowNotification({
          message: 'Berhasil menambah Income ',
          title: 'Income  ditambah',
          type: 'success',
        });
      } else {
        ShowNotification({
          message: 'Gagal menambah Income ',
          title: 'Income  gagal ditambah',
          type: 'failed',
        });
      }

      queryClient.invalidateQueries({ queryKey: [GET_ALL_INCOMES_DATA] });
    },
    onError() {},
  });

  return mutation;
};
