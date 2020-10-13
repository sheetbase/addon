export function json-editorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('Json-editorSidebar').setTitle('Json-editor')
  );
}

// TODO: Add server logic here.
