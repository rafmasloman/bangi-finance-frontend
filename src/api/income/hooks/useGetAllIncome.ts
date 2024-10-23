import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_ALL_INCOMES_DATA } from '../../../constants/query-key';
import { useParams } from 'react-router-dom';

export const useGetAllIncomes = () => {
  const { historyId } = useParams();

  console.log();

  const query = useQuery({
    queryKey: [GET_ALL_INCOMES_DATA, historyId],
    queryFn: () => incomeServiceApi.getAllIncomes(historyId),
    select(data) {
      return data.data.incomes.map((ctx, index) => {
        return {
          no: index + 1,
          id: ctx.id,
          itemSales: ctx.itemSales,
          itemDiscount: ctx.itemDiscount,
          billDiscount: ctx.billDiscount,
          focItem: ctx.focItem,
          focBill: ctx.focBill,
          totalSales: ctx.totalSales,
          ppn: ctx.ppn,
          service: ctx.service,
          totalCollection: ctx.totalCollection,
          date: ctx.date,
        };
      });
    },
  });

  return query;
};
