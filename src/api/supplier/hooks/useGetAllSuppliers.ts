import { useQuery } from "@tanstack/react-query";
import supplierService from "../SupplierService";
import { GET_ALL_SUPPLIERS_DATA } from "../../../constants/query-key";
import moment from "moment";

export const useGetAllSuppliers = (
  historyId?: string,
  supCompId?: string,
  dueDate?: string,
  paidStatus?: string
) => {
  const query = useQuery({
    queryKey: [
      GET_ALL_SUPPLIERS_DATA,
      historyId,
      supCompId,
      dueDate,
      paidStatus,
    ],
    queryFn: () =>
      supplierService.getAllSuppliers(
        historyId,
        supCompId,
        dueDate,
        paidStatus
      ),
    select(data) {
      return {
        suppliers: data.data.supplier.map((ctx, index) => {
          return {
            no: index + 1,
            id: ctx.id,
            nomorFaktur: ctx.nomorFaktur,
            jatuhTempo: moment(ctx.jatuhTempo).format("DD MMMM YYYY"),
            // discount: ctx.discount,
            // evidence: ctx.evidence,
            // ppn: ctx.ppn,
            // price: ctx.price,
            // quantity: ctx.quantity,
            totalAmount: ctx.totalAmount,
            paymentStatus: ctx.paymentStatus,
            date: moment(ctx.date).format("DD MMMM YYYY"),
            supplierCompany: ctx.supplierCompany,
          };
        }),
      };
    },
  });

  return query;
};
