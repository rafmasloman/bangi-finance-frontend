import { HISTORY_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  IHistoryRemainingResponseData,
  IHistoryRequestPayload,
  IHistoryResponseData,
  IMDRResponseData,
} from './HistoryInterface';

class HistoryService {
  async createHistory(
    payload: IHistoryRequestPayload,
  ): Promise<IApiBaseResponse<IHistoryResponseData>> {
    try {
      const response = await http.post(`${HISTORY_API_ROUTE}`, payload);

      const data: IApiBaseResponse<IHistoryResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllHistories(
    month?: string,
    year?: string,
  ): Promise<IApiBaseResponse<IHistoryResponseData[]>> {
    try {
      const response = await http.get(
        `${HISTORY_API_ROUTE}?month=${month ?? ''}&year=${year ?? ''}`,
      );

      const data: IApiBaseResponse<IHistoryResponseData[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMDR(id?: string): Promise<IApiBaseResponse<IMDRResponseData>> {
    try {
      const response = await http.get(`${HISTORY_API_ROUTE}/${id}/mdr`);

      const data: IApiBaseResponse<IMDRResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getHistoryDetail(
    id?: string,
  ): Promise<IApiBaseResponse<IHistoryResponseData>> {
    try {
      const response = await http.get(`${HISTORY_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<IHistoryResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRemaingDataHistory(
    id?: string,
  ): Promise<IApiBaseResponse<IHistoryRemainingResponseData>> {
    try {
      const response = await http.get(`${HISTORY_API_ROUTE}/${id}/stats`);

      const data: IApiBaseResponse<IHistoryRemainingResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteHistory(id?: string) {
    try {
      const response = await http.delete(`${HISTORY_API_ROUTE}/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateHistory(params: {
    id?: string;
    payload: IHistoryRequestPayload;
  }) {
    try {
      const response = await http.put(
        `${HISTORY_API_ROUTE}/${params.id}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateMDR(params: { id?: string; payload: { mdr: number } }) {
    try {
      const response = await http.put(`${HISTORY_API_ROUTE}/${params.id}/mdr`, {
        mdr: params.payload.mdr,
      });

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const historyServiceApi = new HistoryService();

export default historyServiceApi;
