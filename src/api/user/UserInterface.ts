export interface ICreateUserRequestParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IUpdateUserRequestParams {
  email?: string;
  password?: string;
  username?: string;
  phoneNumber?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export interface IUserDetailResponseData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
}
