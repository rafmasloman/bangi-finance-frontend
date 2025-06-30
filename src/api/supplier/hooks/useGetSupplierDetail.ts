import { useQuery } from "@tanstack/react-query";
import supplierService from "../SupplierService";
import { GET_SUPPLIER_DETAIL_DATA } from "../../../constants/query-key";

export const useGetSupplierDetail = (id?: string, isModalOpened?: boolean) => {
  const query = useQuery({
    queryKey: [GET_SUPPLIER_DETAIL_DATA, id],
    queryFn: () => supplierService.getDetailSupplier(id),
    // select(data) {
    //   return {
    //     id: data.data.id,
    //     discount: data.data.discount,
    //     evidence: data.data.evidence,
    //     ppn: data.data.ppn,
    //     price: data.data.price,
    //     quantity: data.data.quantity,
    //     date: data.data.date,
    //     paymentStatus: data.data.paymentStatus,
    //     supplierCompany: { ...data.data.supplierCompany },
    //   };
    // },
    select(data) {
      return {
        id: data.data.id,
        nomorFaktur: data.data.nomorFaktur,
        jatuhTempo: data.data.jatuhTempo,
        totalAmount: data.data.totalAmount,
        date: data.data.date,
        paymentStatus: data.data.paymentStatus,
        supplierCompany: { ...data.data.supplierCompany },
      };
    },
    enabled: !!id && isModalOpened,
  });

  return query;
};
