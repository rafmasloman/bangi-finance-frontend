import { AxiosResponse } from 'axios';
import { INCOME_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  IIncomeAnalyticsResponseData,
  IIncomeProfitSummaryResponse,
  IIncomeRequestParams,
  IIncomeResponseData,
  IIncomeResponseDetailData,
  IIncomeSummaryResponse,
} from './IncomeInterface';

class IncomeService {
  async createIncome(params: IIncomeRequestParams) {
    try {
      const response = await http.post(`${INCOME_API_ROUTE}`, params);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllIncomes(
    historyId?: string,
  ): Promise<IApiBaseResponse<IIncomeResponseData>> {
    try {
      const response: AxiosResponse = await http.get(
        `${INCOME_API_ROUTE}?historyId=${historyId}`,
      );

      const data: IApiBaseResponse<IIncomeResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getIncomeAnalytics(
    historyId?: string,
  ): Promise<IApiBaseResponse<IIncomeAnalyticsResponseData>> {
    try {
      const response: AxiosResponse = await http.get(
        `${INCOME_API_ROUTE}/${historyId}/analytics`,
      );

      const data: IApiBaseResponse<IIncomeAnalyticsResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getIncomeProfit(
    id?: string,
  ): Promise<IApiBaseResponse<IIncomeProfitSummaryResponse>> {
    try {
      const response: AxiosResponse = await http.get(
        `${INCOME_API_ROUTE}/${id}/profit`,
      );

      const data: IApiBaseResponse<IIncomeProfitSummaryResponse> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSummaryData(
    id?: string,
  ): Promise<IApiBaseResponse<IIncomeSummaryResponse>> {
    try {
      const response: AxiosResponse = await http.get(
        `${INCOME_API_ROUTE}/${id}/summary`,
      );

      const data: IApiBaseResponse<IIncomeSummaryResponse> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getIncomeDetail(
    id?: string,
  ): Promise<IApiBaseResponse<IIncomeResponseDetailData>> {
    try {
      const response = await http.get(`${INCOME_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<IIncomeResponseDetailData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateIncome(params: { id: string; body: IIncomeRequestParams }) {
    try {
      const response = await http.put(
        `${INCOME_API_ROUTE}/${params.id}`,
        params.body,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteIncome(id: string) {
    try {
      const response = await http.delete(`${INCOME_API_ROUTE}/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getTotalIncomeAnalytics() {
    try {
      const response = await http.get(`${INCOME_API_ROUTE}/analytics`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const incomeServiceApi = new IncomeService();

export default incomeServiceApi;
