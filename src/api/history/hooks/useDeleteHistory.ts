import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_HISTORIES_DATA } from '../../../constants/query-key';
import historyServiceApi from '../HistoryService';

export const useDeleteHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: historyServiceApi.deleteHistory,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_HISTORIES_DATA],
      });
    },
  });
};
