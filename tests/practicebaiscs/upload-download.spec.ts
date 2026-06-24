// Suppress TS error if exceljs types are not installed in this environment
// @ts-ignore: Cannot find module 'exceljs' or its corresponding type declarations
import ExcelJS from 'exceljs';
import { expect, test } from '@playwright/test';


    let output = { row: -1, column: -1 };

    const workbook = new ExcelJS.Workbook();
    // adjust the path to your actual file
    await workbook.xlsx.readFile('tests/data.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row: any, rowNumber: any) => {
        // process each row
        row.eachCell((cell: any, colNumber: number) => {
            if (cell.value === 'abc') {
                // handle matching cell value
                output = {
                    row: rowNumber,
                    column: colNumber
                };
            }
        });
    });

