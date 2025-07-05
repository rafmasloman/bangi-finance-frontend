import { z } from "zod";

// export const SupplierInputSchema = z.object({
//   evidence: z.string().min(1, { message: 'Keterangan harus diinput' }),
//   quantity: z.number().min(1, { message: 'Jumlah harus diinput' }),
//   price: z.number().min(1, { message: 'Harga harus diinput' }),
//   discount: z.number(),
//   date: z.date({ message: 'Tanggal harus diinput' }),
//   ppn: z.number(),
// });

// Schema input v2
export const SupplierInputSchema = z.object({
  totalAmount: z.number().min(1, { message: "Total Harga harus diinput" }),
  nomorFaktur: z.string().min(1, { message: "Nomor Faktur harus diinput" }),
  jatuhTempo: z.date({ message: "Jatuh tempo harus diinput" }),
  date: z.date({ message: "Tanggal harus diinput" }),
});

export const SupplierPaymentInputSchema = z.object({
  paymentStatus: z
    .string({ message: "Status pembayaran harus dipilih" })
    .min(1, { message: "Status pembayaran harus dipilih" }),
});

// export const tableHeadSuppliers = [
//   {
//     label: "No",
//   },
//   { label: "Tanggal" },
//   { label: "Supplier" },
//   { label: "Keterangan" },
//   { label: "Jumlah" },
//   { label: "Harga" },
//   { label: "Discount" },
//   { label: "PPN" },
//   { label: "Total" },
//   { label: "Status" },
//   { label: "Action" },
// ];

export const tableHeadSuppliers = [
  {
    label: "No",
  },
  { label: "Tanggal" },
  { label: "Supplier" },
  { label: "Nomor Faktur" },
  { label: "Total" },
  { label: "Jatuh Tempo" },
  { label: "Status" },
];

export const tableHeadSupplierCompany = [
  {
    label: "No",
  },
  { label: "Supplier Name" },
  { label: "Action" },
];
