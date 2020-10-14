// temporary for ayedocs
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Options {}

/**
 * addon.js
 */

export type ErrorAlert = (error: string | Error, title?: string) => unknown;

/**
 * environment
 */

export interface Run {
  withFailureHandler: (callback: (error: Error) => unknown) => Run;
  withSuccessHandler: <Value>(callback: (value: Value) => unknown) => Run;
  // server functions
  [name: string]: (...args: any[]) => unknown;
}

export interface Script {
  run: Run;
}

export interface Google {
  script: Script;
}

/**
 * editor
 */

export type EditorType = 'json' | 'html';

export type EditorSetMode = 'RAW' | 'CURRENT' | 'NEW_INTERNAL' | 'NEW_EXTERNAL';

export interface EditorData {
  source?: string; // id or url
  sourceUrl?: string;
  autoLoaded?: boolean;
  content?: string;
  viewUrl?: string;
  onDrive?: boolean;
}

export interface EditorConfig {
  autoloadedScheme: string;
  webhookEvent: string;
  mimeType: string;
  fileExt: string;
  valueHandler: (value: string) => string;
}

/**
 * project
 */

export interface ProjectBuiltinSettings {
  PROJECT_ID?: string;
  PROJECT_NAME?: string;
  DATABASE_ID?: string;
  BACKEND_ID?: string;
  UPLOAD_ID?: string;
  CONTENT_ID?: string;
  STORAGE_ID?: string;
}

export interface ProjectCustomSettings {
  HOMEPAGE?: string;
  GCP_ID?: string;
  WEBHOOK_URL?: string;
}

export interface ProjectSettings
  extends ProjectBuiltinSettings,
    ProjectCustomSettings {}

/**
 * Drive
 */

export type DriveSharing = DriveSharingPreset | DriveSharingValue;
type DriveSharingPreset = 'PUBLIC' | 'PRIVATE';
export interface DriveSharingValue {
  access?: string;
  permission?: string;
}

export interface DriveItemInfo {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  link: string;
  size: number;
  sharing: DriveSharingValue;
}

export type DriveFolderInfo = DriveItemInfo;
export interface DriveFileInfo extends DriveItemInfo {
  mimeType: string;
  url: string;
  downloadUrl: string;
}

/**
 * Fetch
 */

export type FetchMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/**
 * misc
 */

export interface ActionMessage {
  type: 'success' | 'warning' | 'error';
  message: string;
}
