export interface ILoginRequestParams {
  username: string;
  password: string;
}

export interface ILoginResponseData {
  token: string;
}

export interface IUserCredentialResponseData {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IUpdatePasswordRequestParams {
  userId: string;
  newPassword: string;
}
