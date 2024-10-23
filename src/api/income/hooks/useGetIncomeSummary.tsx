import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_INCOME_SUMMARY_DATA } from '../../../constants/query-key';

export const useGetIncomeSummary = (id?: string) => {
  const query = useQuery({
    queryKey: [GET_INCOME_SUMMARY_DATA, id],
    queryFn: () => incomeServiceApi.getSummaryData(id),
    select(data) {
      return data.data;
    },
    enabled: !!id,
  });

  return query;
};
