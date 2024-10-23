import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_INCOME_DETAIL_DATA } from '../../../constants/query-key';

export const useGetIncomeDetail = (id?: string) => {
  const query = useQuery({
    queryKey: [GET_INCOME_DETAIL_DATA, id],
    queryFn: () => incomeServiceApi.getIncomeDetail(id),
    select(data) {
      return data.data;
    },
    enabled: !!id,
  });

  return query;
};
