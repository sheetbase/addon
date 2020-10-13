import {loadContent, saveContent} from '../../../lib/services/editor.service';

import {EditorData, EditorSetMode} from '../../../lib/types/addon.type';

export function jsonEditorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('JsonEditorSidebar').setTitle(
      'Json Editor'
    )
  );
}

export function loadJsonContent(): EditorData {
  return loadContent('json');
}

export function saveJsonContent(setMode: EditorSetMode, data: EditorData) {
  return saveContent('json', setMode, data);
}
