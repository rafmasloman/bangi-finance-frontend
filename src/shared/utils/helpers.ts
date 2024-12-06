import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

export function formatPathToTitle(path: string) {
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];

  const formattedTitle = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedTitle;
}

export const formatRupiah = (value: any) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

export const exportToExcel = (
  excelDataFileType: any,
  filename: string,
  dataTime: { month?: string; year?: string; createdAt?: string }
) => {
  console.log("excel : ", excelDataFileType);

  if (!!excelDataFileType) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Menambahkan header
    const headersData = Object.keys(excelDataFileType[0]);
    worksheet.columns = headersData.map((header) => ({
      header,
      key: header,
      width: header.length + 10, // Set default width kolom
    }));

    // Styling header
    headersData.forEach((_header, index) => {
      const cell = worksheet.getCell(1, index + 1); // Header ada di baris 1
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" }, // Background kuning
      };
      cell.font = {
        bold: true,
        color: { argb: "000000" }, // Font hitam
        size: 12,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" }; // Rata tengah
    });

    // Menambahkan data ke dalam tabel
    excelDataFileType.forEach((row: any, rowIndex: number) => {
      headersData.forEach((header, colIndex) => {
        const cell = worksheet.getCell(rowIndex + 2, colIndex + 1); // Data mulai dari baris ke-2
        const value = row[header];

        // Jika nilai adalah angka, format menjadi Rupiah
        if (typeof value === "number") {
          cell.value = value;
          cell.numFmt = '#,##0.00 "IDR"'; // Format angka ke Rupiah
        } else {
          cell.value = value; // Jika bukan angka, langsung masukkan nilai
        }

        // Tambahkan border pada setiap cell
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Ekspor workbook ke file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(
        blob,
        `${dataTime.createdAt}-(${filename} ${dataTime.month} ${dataTime.year}).xlsx`
      );
    });
  }
};
