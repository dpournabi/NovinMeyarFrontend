import * as XLSX from 'xlsx';

export class TableUtil {
    exportToExcel(name?: string, data?: any) {
        const timeSpan = new Date().toISOString();
        const prefix = name || 'ExportResult';
        const fileName = `${prefix}-${timeSpan}`;
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        if (!wb.Workbook) { wb.Workbook = {}; }
        if (!wb.Workbook.Views) { wb.Workbook.Views = []; }
        if (!wb.Workbook.Views[0]) { wb.Workbook.Views[0] = {}; }
        wb.Workbook.Views[0].RTL = true;
        XLSX.utils.book_append_sheet(wb, ws, name);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
}
