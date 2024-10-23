export interface ISupplierCategoryRequestParams {
  name: string;
}

export interface ISupplierCategoryResponseData {
  id: number;
  name: string;
  suppliers: ISupplierCategoryResponseData[];
}
