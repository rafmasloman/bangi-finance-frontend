import { USER_API_ROUTE } from '../../constants/api-route';
import { http } from '../../libs/axios/http';
import { IApiBaseResponse } from '../ApiInterface';
import {
  ICreateUserRequestParams,
  IUpdateUserRequestParams,
  IUserDetailResponseData,
} from './UserInterface';

class UserService {
  async createUser(payload: ICreateUserRequestParams) {
    try {
      const response = await http.post(`${USER_API_ROUTE}`, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<IApiBaseResponse<IUserDetailResponseData[]>> {
    try {
      const response = await http.get(`${USER_API_ROUTE}`);

      const data: IApiBaseResponse<IUserDetailResponseData[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserDetail(
    id?: string,
  ): Promise<IApiBaseResponse<IUserDetailResponseData>> {
    try {
      const response = await http.get(`${USER_API_ROUTE}/${id}`);

      const data: IApiBaseResponse<IUserDetailResponseData> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(params: { id: string; payload: IUpdateUserRequestParams }) {
    try {
      const response = await http.put(
        `${USER_API_ROUTE}/${params.id}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id?: string) {
    try {
      const response = await http.delete(`${USER_API_ROUTE}/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const userServiceApi = new UserService();

export default userServiceApi;
