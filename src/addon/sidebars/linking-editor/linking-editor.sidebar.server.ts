export function linking-editorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('Linking-editorSidebar').setTitle('Linking-editor')
  );
}

// TODO: Add server logic here.
