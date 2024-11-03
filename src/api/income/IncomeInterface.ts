export interface IIncomeRequestParams {
  date: Date;
  itemSales: number;
  itemDiscount?: number;
  billDiscount?: number;
  focItem?: number;
  focBill: number;
  service: number;
  historyId: string;
  userId?: string;
}

export interface IIncomeResponseData {
  incomes: {
    id: string;
    date: Date;
    itemSales: number;
    itemDiscount?: number;
    billDiscount?: number;
    focItem?: number;
    focBill: number;
    service: number;
    totalSales: number;
    ppn: number;
    totalCollection: number;
    historyId: string;
  }[];
  totalPages?: number;
}

export interface IIncomeResponseDetailData {
  id: string;
  date: Date;
  itemSales: number;
  itemDiscount?: number;
  billDiscount?: number;
  focItem?: number;
  focBill: number;
  service: number;
  totalSales: number;
  ppn: number;
  totalCollection: number;
  historyId: string;
}

export interface IIncomeAnalyticsResponseData {
  salesAnalytics: {
    total: number;
  };
  servicesAnalytics: {
    total: number;
    category: {
      management: number;
      employe: number;
    };
  };
  collectionAnalytics: {
    total: number;
  };
  ppnAnalytics: {
    total: number;
  };
  average: number;
}

export interface IIncomeProfitSummaryResponse {
  profit: {
    amount: number;
    percent: number;
  };
  foodCost: number;
  operational: number;
  employeePayroll: number;
  discFoc: number;
}

export interface IIncomeSummaryResponse {
  itemSales: number;
  totalDiscount: number;
  totalFoc: number;
  totalSales: number;
  discByFoc: number;
}
