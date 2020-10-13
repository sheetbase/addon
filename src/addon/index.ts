export class Addon {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAddon(e: unknown) {
    return SpreadsheetApp.getUi()
      .createMenu('Sheetbase')
      .addItem('Json Editor', 'jsonEditorSidebar')
      .addItem('Html Editor', 'htmlEditorSidebar')
      .addItem('Linking Editor', 'linkingEditorSidebar')
      .addSeparator()
      .addItem('Settings', 'settingsModal')
      .addItem('Help', 'helpSidebar')
      .addToUi();
  }
}
