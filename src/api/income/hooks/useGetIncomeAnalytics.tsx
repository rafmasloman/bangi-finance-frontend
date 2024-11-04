import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_INCOME_ANALYTICS_DATA } from '../../../constants/query-key';
import { useParams } from 'react-router-dom';

export const useGetIncomeAnalytics = () => {
  const { historyId } = useParams();
  const query = useQuery({
    queryKey: [GET_INCOME_ANALYTICS_DATA],
    queryFn: () => incomeServiceApi.getIncomeAnalytics(historyId),
    select(data) {
      return data.data;
    },
  });

  return query;
};
