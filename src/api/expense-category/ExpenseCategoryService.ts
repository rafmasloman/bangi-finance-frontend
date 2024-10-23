import { EXPENSE_CATEGORY_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  IExpenseCategoryRequestParams,
  IExpenseCategoryResponseData,
} from './ExpenseCategoryInterface';

class ExpenseCategoryService {
  async createExpenseCategory(
    payload: IExpenseCategoryRequestParams,
  ): Promise<IApiBaseResponse<IExpenseCategoryResponseData>> {
    try {
      const response = await http.post(
        `${EXPENSE_CATEGORY_API_ROUTE}`,
        payload,
      );

      const data: IApiBaseResponse<IExpenseCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllExpenseCategories(): Promise<
    IApiBaseResponse<IExpenseCategoryResponseData[]>
  > {
    try {
      const response = await http.get(`${EXPENSE_CATEGORY_API_ROUTE}`);

      const data: IApiBaseResponse<IExpenseCategoryResponseData[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDetailExpenseCategory(
    id?: string,
  ): Promise<IApiBaseResponse<IExpenseCategoryResponseData>> {
    try {
      const response = await http.get(`${EXPENSE_CATEGORY_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<IExpenseCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateExpenseCategory(params: {
    id: string;
    payload: IExpenseCategoryRequestParams;
  }): Promise<IApiBaseResponse<IExpenseCategoryResponseData>> {
    try {
      const response = await http.put(
        `${EXPENSE_CATEGORY_API_ROUTE}/${params.id}`,
        params.payload,
      );

      const data: IApiBaseResponse<IExpenseCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpenseCategory(id: string): Promise<IApiBaseResponse<null>> {
    try {
      const response = await http.delete(`${EXPENSE_CATEGORY_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<null> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const expenseCategoryServiceApi = new ExpenseCategoryService();

export default expenseCategoryServiceApi;
