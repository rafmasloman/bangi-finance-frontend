export interface IApiBaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export enum PaymentStatus {
  PAID,
  UNPAID,
}
