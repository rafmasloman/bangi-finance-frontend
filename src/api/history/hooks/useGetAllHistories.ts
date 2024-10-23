import { useQuery } from '@tanstack/react-query';
import historyServiceApi from '../HistoryService';
import { GET_ALL_HISTORIES_DATA } from '../../../constants/query-key';

export const useGetAllHistories = (month?: string, year?: string) => {
  const query = useQuery({
    queryKey: [GET_ALL_HISTORIES_DATA],
    queryFn: () => historyServiceApi.getAllHistories(month, year),
    select(data) {
      console.log('data : ', data);

      return data.data.map((ctx, index) => {
        return {
          no: index + 1,
          id: ctx.id,
          title: ctx.title,
          remainingEmployeeService: ctx.remainingEmployeeService,
          remainingManagementService: ctx.remainingManagementService,
          remainingRawMaterials: ctx.remainingRawMaterials,
          remainingSales: ctx.remainingSales,
          remainingTax: ctx.remainingTax,
        };
      });
    },
  });

  return query;
};
