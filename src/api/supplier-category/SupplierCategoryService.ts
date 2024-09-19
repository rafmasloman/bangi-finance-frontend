import { AxiosResponse } from 'axios';
import { SUPPLIER_CATEGORY_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  ISupplierCategoryRequestParams,
  ISupplierCategoryResponseData,
} from './SupplierCategoryInterface';

class SupplierCategory {
  async createSupplierCategory(
    params: ISupplierCategoryRequestParams,
  ): Promise<IApiBaseResponse<ISupplierCategoryResponseData>> {
    try {
      const response: AxiosResponse = await http.post(
        SUPPLIER_CATEGORY_API_ROUTE,
        params,
      );

      const data: IApiBaseResponse<ISupplierCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllSupplierCategories(): Promise<
    IApiBaseResponse<ISupplierCategoryResponseData[]>
  > {
    try {
      const response: AxiosResponse = await http.get(
        SUPPLIER_CATEGORY_API_ROUTE,
      );

      const data: IApiBaseResponse<ISupplierCategoryResponseData[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSupplierCategory(
    id: string,
  ): Promise<IApiBaseResponse<ISupplierCategoryResponseData>> {
    try {
      const response: AxiosResponse = await http.get(
        `${SUPPLIER_CATEGORY_API_ROUTE}/${id}`,
      );

      const data: IApiBaseResponse<ISupplierCategoryResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const supplierCategoryApi = new SupplierCategory();

export default supplierCategoryApi;
