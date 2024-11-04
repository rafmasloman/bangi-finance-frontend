export interface IExpenseRequestParams {
  evidence: string;
  price: number;
  date: Date;
  expenseCategory: number;
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
    expenseCategory: string;
    note: string;
    historyId?: string;
    histories: {
      title: string;
    };
    user: {
      firstname: string;
      lastname: string;
    };
  }[];
  totalRecords: number;
}

export interface IExpenseResponseDetailData {
  id: string;
  evidence: string;
  price: number;
  date: Date;
  expenseCategory: string;
  note: string;
  historyId?: string;
}

export interface IExpenseAmountCategoryResponseData {
  expense: {
    category: string;
    amount: number;
  }[];
  totalExpense: number;
}

export interface IExpenseSummaryResponseData {
  rawMaterials: number;
  operational: number;
  payrollEmployee: number;
  totalExpense: number;
}
