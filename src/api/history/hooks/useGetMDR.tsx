import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import historyServiceApi from '../HistoryService';
import { GET_MDR_DATA } from '../../../constants/query-key';

export const useGetMDR = () => {
  const { historyId } = useParams();
  return useQuery({
    queryKey: [GET_MDR_DATA, historyId],
    queryFn: () => historyServiceApi.getMDR(historyId),
    select(data) {
      return {
        mdr: data.data.mdr,
        totalMDR: data.data.totalMDR,
      };
    },
    enabled: !!historyId,
  });
};
