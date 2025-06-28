import { PaymentStatus } from "../ApiInterface";

// export interface ISupplierRequestParams {
//   discount: number;
//   evidence: string;
//   paymentStatus: string;
//   price: number;
//   quantity: number;
//   ppn: number;
//   supplierCompanyId: number;
//   date: string;
//   historyId?: string;
//   userId?: string;
// }

export interface ISupplierRequestParams {
  paymentStatus: string;
  nomorFaktur: string;
  jatuhTempo: string;
  totalAmount: number;
  supplierCompanyId: number;
  date: string;
  historyId?: string;
  userId?: string;
}

// export interface IUpdateSupplierRequestParams {
//   discount: number;
//   evidence: string;
//   price: number;
//   quantity: number;
//   ppn: number;
//   supplierCompanyId: number;
//   date: string;
//   historyId?: string;
//   userId?: string;
// }

export interface IUpdateSupplierRequestParams {
  nomorFaktur: string;
  jatuhTempo: string;
  totalAmount: number;
  supplierCompanyId: number;
  date: string;
  historyId?: string;
  userId?: string;
}

// export interface ISupplierResponseData {
//   supplier: {
//     id: string;
//     discount: number;
//     evidence: string;
//     paymentStatus: PaymentStatus;
//     price: number;
//     quantity: number;
//     ppn: number;
//     date: string;
//     totalAmount: number;
//     supplierCompany: {
//       id: number;
//       name: string;
//     };
//   }[];
//   totalSupplier: number;
// }

// export interface ISupplierResponseDetailData {
//   id: string;
//   discount: number;
//   evidence: string;
//   paymentStatus: string;
//   price: number;
//   quantity: number;
//   ppn: number;
//   date: string;
//   supplierCompany: {
//     id: number;
//     name: string;
//   };
// }

// supplier response data v2

export interface ISupplierResponseData {
  supplier: {
    id: string;
    nomorFaktur: string;
    paymentStatus: PaymentStatus;
    jatuhTempo: string;
    date: string;
    totalAmount: number;
    supplierCompany: {
      id: number;
      name: string;
    };
  }[];
  totalSupplier: number;
}

export interface ISupplierResponseDetailData {
  id: string;
  totalAmount: number;
  nomorFaktur: string;
  jatuhTempo: string;
  paymentStatus: string;
  date: string;
  supplierCompany: {
    id: number;
    name: string;
  };
}

export interface ISupplierTotalPaymentResponseData {
  paymentStatusAmount: {
    _sum: {
      totalAmount: number;
    };
    _count: {
      _all: number;
    };
    paymentStatus: string;
  }[];
  totalPaid: number;
  totalUnpaid: number;
}

export interface ISupplierTotalAmountByPaymentStatusResponse {
  payment: {
    id: number;
    name: string;
    totalAmount: number;
  }[];
  totalPayment: number;
}
