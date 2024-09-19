import { AxiosResponse } from 'axios';
import { SUPPLIER_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  ISupplierRequestParams,
  ISupplierResponseData,
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
}

const supplierService = new SupplierService();

export default supplierService;
