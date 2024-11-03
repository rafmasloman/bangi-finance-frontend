import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import historyServiceApi from '../HistoryService';
import { GET_REMAINING_HISTORY_DATA } from '../../../constants/query-key';

export const useGetRemainingData = () => {
  const { historyId } = useParams();
  return useQuery({
    queryKey: [GET_REMAINING_HISTORY_DATA, historyId],
    queryFn: () => historyServiceApi.getRemaingDataHistory(historyId),
    select(data) {
      return {
        remainingMontEmployeeService: data.data.remainingMontEmployeeService,
        remainingMonthManagementService:
          data.data.remainingMonthManagementService,
        remainingMonthTax: data.data.remainingMonthTax,
        remainingSales: data.data.remainingSales,
        balance: data.data.balance,
      };
    },
    enabled: !!historyId,
  });
};
