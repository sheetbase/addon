export function helpSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('HelpSidebar').setTitle('Help')
  );
}

// TODO: 'Add server logic.'
