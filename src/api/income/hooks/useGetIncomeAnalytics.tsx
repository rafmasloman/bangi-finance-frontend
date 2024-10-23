import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_INCOME_ANALYTICS_DATA } from '../../../constants/query-key';

export const useGetIncomeAnalytics = () => {
  const query = useQuery({
    queryKey: [GET_INCOME_ANALYTICS_DATA],
    queryFn: () => incomeServiceApi.getIncomeAnalytics(),
    select(data) {
      return data.data;
    },
  });

  return query;
};
