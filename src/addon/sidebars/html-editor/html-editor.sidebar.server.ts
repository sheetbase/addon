import {
  buildDriveFileUCUrl,
  createFileFromBase64Body,
} from '../../../lib/services/drive.service';
import {getDocsContent} from '../../../lib/services/docs.service';
import {loadContent, saveContent} from '../../../lib/services/editor.service';
import {getStorageFolderChild} from '../../../lib/services/project.service';

import {EditorData, EditorSetMode} from '../../../lib/types/addon.type';

export function htmlEditorSidebar() {
  return SpreadsheetApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile('HtmlEditorSidebar').setTitle(
      'Html Editor'
    )
  );
}

export function loadDocContent(id: string, style = false) {
  return getDocsContent(id, !style);
}

export function loadHtmlContent(): EditorData {
  return loadContent('html');
}

export function saveHtmlContent(setMode: EditorSetMode, data: EditorData) {
  return saveContent('html', setMode, data);
}

export function uploadEditorFile(
  base64Body: string,
  mimeType: string,
  name: string
) {
  const folder = getStorageFolderChild(mimeType);
  const file = createFileFromBase64Body(folder, name, mimeType, base64Body);
  return buildDriveFileUCUrl(file.getId());
}
