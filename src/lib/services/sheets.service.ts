import {confirmAlert} from './ui.service';

// https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app

export function getSpreadsheet(spreadsheetId?: string) {
  return spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
}

export function getAllSheets(spreadsheetId?: string) {
  const spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheets();
}

export function getAllSheetNames(spreadsheetId?: string) {
  const names: string[] = [];
  getAllSheets(spreadsheetId).forEach(sheet => names.push(sheet.getName()));
  return names;
}

export function getSheet(spreadsheetId?: string, name?: string) {
  const spreadsheet = getSpreadsheet(spreadsheetId);
  const sheet = name
    ? spreadsheet.getSheetByName(name)
    : spreadsheet.getActiveSheet();
  if (!sheet) {
    throw new Error('No sheet found.');
  }
  return sheet;
}

export function getData(
  spreadsheetId?: string,
  rangeA1?: string,
  noHeaders = false,
  raw = true
) {
  const spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
  const range = rangeA1
    ? spreadsheet.getRange(rangeA1)
    : SpreadsheetApp.getActiveRange();
  const data =
    range.getWidth() <= 1 && range.getHeight() <= 1
      ? range.getValue()
      : range.getValues();
  return raw ? data : transformValue_(data, noHeaders);
}

export function setData(
  data: unknown,
  spreadsheetId?: string,
  rangeA1?: string, // set: Sheet1!A:A | append: Sheet1
  isAppended = false
) {
  // spreadsheet
  const spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
  // sheet & range
  let sheet: GoogleAppsScript.Spreadsheet.Sheet;
  let range: GoogleAppsScript.Spreadsheet.Range;
  if (isAppended) {
    sheet = rangeA1
      ? (spreadsheet.getSheetByName(
          rangeA1
        ) as GoogleAppsScript.Spreadsheet.Sheet)
      : SpreadsheetApp.getActiveSheet();
    // append data to the last row
    const lastRow = sheet.getLastRow() + 1;
    range = sheet.getRange('A' + lastRow + ':' + lastRow);
  } else {
    range = rangeA1
      ? spreadsheet.getRange(rangeA1)
      : SpreadsheetApp.getActiveRange();
  }
  // set the data
  return !getData() || !!confirmAlert('Overwrite existing data?', 'Overwrite?')
    ? range.getWidth() <= 1 && range.getHeight() <= 1
      ? range.setValue(data)
      : range.setValues(data as unknown[][])
    : false;
}

function transformValue_(values: unknown[], noHeaders = false) {
  const items = [];
  // header
  let headers = ['value'];
  let data = values || [];
  if (!noHeaders) {
    headers = (values[0] || []) as string[];
    data = values.slice(1, values.length) || [];
  }
  // content
  for (let i = 0; i < data.length; i++) {
    const rows = data[i] as unknown[];
    const item = {} as Record<string, unknown>;
    for (let j = 0; j < rows.length; j++) {
      if (rows[j]) {
        let val = rows[j];
        // parse value
        if ((data + '').toLowerCase() === 'true') {
          // boolean TRUE
          val = true;
        } else if ((val + '').toLowerCase() === 'false') {
          // boolean FALSE
          val = false;
        } else if (!isNaN(val as number)) {
          // number
          val = Number(val);
        } else if (
          ((val as string).substr(0, 1) === '{' &&
            (val as string).substr(-1) === '}') ||
          ((val as string).substr(0, 1) === '[' &&
            (val as string).substr(-1) === ']')
        ) {
          // JSON
          try {
            val = JSON.parse(val as string);
          } catch (e) {
            // continue
          }
        }
        // save parsed value
        item[headers[j] || headers[0] + j] = val;
      }
    }
    // only non-empty
    if (Object.keys(item).length) {
      items.push(item);
    }
  }
  // result
  return items;
}
