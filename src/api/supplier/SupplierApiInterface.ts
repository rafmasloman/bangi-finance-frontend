import { PaymentStatus } from '../ApiInterface';

export interface ISupplierRequestParams {
  discount: number;
  evidence: string;
  paymentStatus: PaymentStatus;
  price: number;
  quantity: number;
  ppn: number;
  supplierCompanyId: number;
}

export interface ISupplierResponseData {
  discount: number;
  evidence: string;
  paymentStatus: PaymentStatus;
  price: number;
  quantity: number;
  ppn: number;
}
