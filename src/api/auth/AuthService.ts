import { ILoginInterfacePropsType } from '../../features/auth/interfaces/AuthInterfaces';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  ILoginResponseData,
  IUpdatePasswordRequestParams,
  IUserCredentialResponseData,
} from './AuthInterface';

class AuthService {
  async login(
    payload: ILoginInterfacePropsType,
  ): Promise<IApiBaseResponse<ILoginResponseData>> {
    try {
      const response = await http.post(`/auth/login`, payload);

      const data: IApiBaseResponse<ILoginResponseData> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async credential(): Promise<IApiBaseResponse<IUserCredentialResponseData>> {
    try {
      const response = await http.get('/auth/credential');

      const data: IApiBaseResponse<IUserCredentialResponseData> =
        await response.data;

      return data;
    } catch (error) {
      console.log('credential : ', error);

      throw error;
    }
  }

  async changePassword(payload: IUpdatePasswordRequestParams) {
    try {
      const response = await http.put(`/auth/change-password`, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const authServiceApi = new AuthService();

export default authServiceApi;
