import { EXPENSE_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  IExpenseAmountCategoryResponseData,
  IExpenseRequestParams,
  IExpenseResponseData,
  IExpenseResponseDetailData,
  IExpenseSummaryResponseData,
} from './ExpenseInterface';

class ExpenseService {
  async createExpense(
    payload: IExpenseRequestParams,
  ): Promise<IApiBaseResponse<IExpenseResponseData>> {
    try {
      const response = await http.post(`${EXPENSE_API_ROUTE}`, payload);

      const data: IApiBaseResponse<IExpenseResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllExpenses(
    historyId?: string,
  ): Promise<IApiBaseResponse<IExpenseResponseData>> {
    try {
      const response = await http.get(
        `${EXPENSE_API_ROUTE}?historyId=${historyId}`,
      );

      const data: IApiBaseResponse<IExpenseResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDetailExpense(
    id?: string,
  ): Promise<IApiBaseResponse<IExpenseResponseDetailData>> {
    try {
      const response = await http.get(`${EXPENSE_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<IExpenseResponseDetailData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getExpenseCategoryAmount(
    categoryName: string,
    id?: string,
  ): Promise<IApiBaseResponse<IExpenseAmountCategoryResponseData>> {
    try {
      const response = await http.get(
        `${EXPENSE_API_ROUTE}/${id}/category-amount?categoryName=${categoryName}`,
      );

      const data: IApiBaseResponse<IExpenseAmountCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getExpenseSummary(
    id?: string,
  ): Promise<IApiBaseResponse<IExpenseSummaryResponseData>> {
    try {
      const response = await http.get(`${EXPENSE_API_ROUTE}/${id}/summary`);

      const data: IApiBaseResponse<IExpenseSummaryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getExpenseCategories(): Promise<IApiBaseResponse<string[]>> {
    try {
      const response = await http.get(`${EXPENSE_API_ROUTE}/categories`);

      const data: IApiBaseResponse<string[]> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateExpense(params: {
    id: string;
    payload: IExpenseRequestParams;
  }): Promise<IApiBaseResponse<IExpenseResponseData>> {
    try {
      const response = await http.put(
        `${EXPENSE_API_ROUTE}/${params.id}`,
        params.payload,
      );

      const data: IApiBaseResponse<IExpenseResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpense(id: string) {
    try {
      const response = await http.delete(`${EXPENSE_API_ROUTE}/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const expenseServiceApi = new ExpenseService();

export default expenseServiceApi;
