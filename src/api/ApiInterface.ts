export interface IApiBaseResponse<T> {
  status: string;
  message: string;
  data: T;
  statusCode: number;
  timestamp: string;
}

export enum PaymentStatus {
  PAID,
  UNPAID,
}
