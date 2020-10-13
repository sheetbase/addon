import {getAllSheetNames} from '../../../lib/services/sheets.service';

export function linkingEditorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('LinkingEditorSidebar').setTitle(
      'Linking Editor'
    )
  );
}

export function getLinkingSources() {
  const ignores: string[] = [];
  // get all sheet names
  const names = getAllSheetNames();
  // remove ignores
  for (let i = 0; i < ignores.length; i++) {
    const ignore = ignores[i];
    const index = names.indexOf(ignore);
    if (index !== -1) {
      names.splice(index, 1);
    }
  }
  // final
  return names;
}
