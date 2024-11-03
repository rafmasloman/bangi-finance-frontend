export interface IHistoryRequestPayload {
  date: Date;
  remainingEmployeeService: number;
  remainingManagementService: number;
  remainingTax: number;
  remainingSales: number;
  remainingRawMaterials: number;
  month: string;
  year: string;
  title: string;
  mdr?: number;
}

export interface IHistoryResponseData {
  id: string;
  title: string;
  date: Date;
  remainingEmployeeService: number;
  remainingManagementService: number;
  remainingTax: number;
  remainingSales: number;
  remainingRawMaterials: number;
  month: string;
  year: string;
}

export interface IHistoryRemainingResponseData {
  remainingMontEmployeeService: number;
  remainingMonthManagementService: number;
  remainingMonthTax: number;
  remainingSales: number;
  balance: number;
}

export interface IMDRResponseData {
  mdr: number;
  totalMDR: number;
}
