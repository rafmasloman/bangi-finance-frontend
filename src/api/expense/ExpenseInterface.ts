export interface IExpenseRequestParams {
  evidence: string;
  price: number;
  date: Date;
  expenseCategoryId: number;
  note: string;
  historyId?: string;
  userId?: string;
}

export interface IExpenseResponseData {
  expense: {
    id: string;
    evidence: string;
    price: number;
    date: Date;
    expenseCategory: {
      id: number;
      name: string;
    };
    note: string;
    historyId?: string;
  }[];
  totalRecords: number;
}

export interface IExpenseResponseDetailData {
  id: string;
  evidence: string;
  price: number;
  date: Date;
  expenseCategory: {
    id: number;
    name: string;
  };
  note: string;
  historyId?: string;
}

export interface IExpenseAmountCategoryResponseData {
  expense: {
    _sum: {
      price: number;
    };
    expenseCategoryId: number;
    expenseCategoryName: string;
  }[];
  totalExpense: number;
}

export interface IExpenseSummaryResponseData {
  rawMaterials: number;
  operational: number;
  payrollEmployee: number;
  totalExpense: number;
}
