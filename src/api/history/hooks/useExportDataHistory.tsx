import { useQuery } from "@tanstack/react-query";
import { EXPORT_HISTORIES_DATA } from "../../../constants/query-key";
import historyServiceApi from "../HistoryService";

export const useExportExcelDataHistory = (historyId: string, type: string) => {
  const query = useQuery({
    queryKey: [EXPORT_HISTORIES_DATA],
    queryFn: () =>
      historyServiceApi.exportHistoryExcelData({ historyId, type }),
  });

  return query;
};
