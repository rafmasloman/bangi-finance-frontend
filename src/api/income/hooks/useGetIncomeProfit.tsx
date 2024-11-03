import { useQuery } from '@tanstack/react-query';
import incomeServiceApi from '../IncomeService';
import { GET_INCOME_PROFIT_DATA } from '../../../constants/query-key';

export const useGetIncomeProfit = (id?: string) => {
  const query = useQuery({
    queryKey: [GET_INCOME_PROFIT_DATA, id],
    queryFn: () => incomeServiceApi.getIncomeProfit(id),
    select(data) {
      return {
        amount: data.data.profit.amount,
        percent: data.data.profit.percent,
        foodCost: data.data.foodCost,
        operational: data.data.operational,
        employeePayroll: data.data.employeePayroll,
        discFoc: data.data.discFoc,
      };
    },
    enabled: !!id,
  });

  return query;
};
