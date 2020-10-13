import {getSettings, setSettings} from '../../../lib/services/project.service';

import {ProjectSettings} from '../../../lib/types/addon.type';

export function settingsModal() {
  return SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutputFromFile('SettingsModal')
      .setWidth(720)
      .setHeight(480),
    'Settings'
  );
}

export function getProjectSettings(fresh = false) {
  return getSettings(fresh);
}

export function setProjectSettings(settings: ProjectSettings) {
  return setSettings(settings);
}
