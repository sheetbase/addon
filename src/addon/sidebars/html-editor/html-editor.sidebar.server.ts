export function html-editorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('Html-editorSidebar').setTitle('Html-editor')
  );
}

// TODO: Add server logic here.
