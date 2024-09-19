export interface ISupplierCategoryRequestParams {
  name: string;
}

export interface ISupplierCategoryResponseData {
  name: string;
  suppliers: ISupplierCategoryResponseData[];
}
