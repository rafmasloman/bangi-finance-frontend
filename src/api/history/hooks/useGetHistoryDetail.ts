import { useQuery } from '@tanstack/react-query';
import { GET_DETAIL_HISTORY_DATA } from '../../../constants/query-key';
import historyServiceApi from '../HistoryService';

export const useGetDetailHistory = (id?: string, isModalOpened?: boolean) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_HISTORY_DATA, id],
    queryFn: () => historyServiceApi.getHistoryDetail(id),
    select(data) {
      return {
        id: data.data.id,
        title: data.data.title,
        date: data.data.date,
        remainingEmployeeService: data.data.remainingEmployeeService,
        remainingManagementService: data.data.remainingManagementService,
        remainingRawMaterials: data.data.remainingRawMaterials,
        remainingSales: data.data.remainingSales,
        remainingTax: data.data.remainingTax,
        month: data.data.month,
        year: data.data.year,
      };
    },
    enabled: !!id && isModalOpened,
  });

  return query;
};
