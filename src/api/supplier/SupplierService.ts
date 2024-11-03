import { AxiosResponse } from 'axios';
import { SUPPLIER_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  ISupplierRequestParams,
  ISupplierResponseData,
  ISupplierResponseDetailData,
  ISupplierTotalAmountByPaymentStatusResponse,
  ISupplierTotalPaymentResponseData,
  IUpdateSupplierRequestParams,
} from './SupplierApiInterface';

class SupplierService {
  async createSupplier(
    params: ISupplierRequestParams,
  ): Promise<IApiBaseResponse<ISupplierResponseData[]>> {
    try {
      const response: AxiosResponse = await http.post(
        SUPPLIER_API_ROUTE,
        params,
      );

      const data: IApiBaseResponse<ISupplierResponseData[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllSuppliers(
    historyId?: string,
  ): Promise<IApiBaseResponse<ISupplierResponseData>> {
    try {
      const suppliers = await http.get(
        `${SUPPLIER_API_ROUTE}?historyId=${historyId}`,
      );

      const data: IApiBaseResponse<ISupplierResponseData> =
        await suppliers.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDetailSupplier(
    id?: string,
  ): Promise<IApiBaseResponse<ISupplierResponseDetailData>> {
    try {
      const supplier = await http.get(`${SUPPLIER_API_ROUTE}/${id}/detail`);

      const data: IApiBaseResponse<ISupplierResponseDetailData> =
        await supplier.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getTotalPaidSupplier(
    historyId?: string,
  ): Promise<IApiBaseResponse<ISupplierTotalPaymentResponseData>> {
    try {
      const response = await http.get(
        `${SUPPLIER_API_ROUTE}/${historyId}/total-payment`,
      );

      const data: IApiBaseResponse<ISupplierTotalPaymentResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSupplierAmountByStatus(
    historyId?: string,
    paymentStatus: string = 'UNPAID',
  ): Promise<IApiBaseResponse<ISupplierTotalAmountByPaymentStatusResponse>> {
    try {
      const response = await http.get(
        `${SUPPLIER_API_ROUTE}/stats/${historyId}/total-payment?paymentStatus=${paymentStatus}`,
      );

      const data: IApiBaseResponse<ISupplierTotalAmountByPaymentStatusResponse> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateSupplier(params: {
    id: string;
    data: IUpdateSupplierRequestParams;
  }) {
    try {
      const response = await http.put(
        `${SUPPLIER_API_ROUTE}/${params.id}`,
        params.data,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateSupplierPaymentStatus(params: {
    id?: string[];
    paymentStatus: 'PAID' | 'UNPAID';
  }) {
    try {
      const response = await http.put(
        `${SUPPLIER_API_ROUTE}/${params.id}/payment-status`,
        { supplierId: params.id, paymentStatus: params.paymentStatus },
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSupplier(id: string) {
    try {
      const supplier = await http.delete(`${SUPPLIER_API_ROUTE}/${id}`);

      const data = await supplier.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const supplierService = new SupplierService();

export default supplierService;
