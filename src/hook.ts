export * from './public-api';
import {Addon} from './addon/index';

const addon = new Addon();
export function onOpen(e: unknown) {
  return addon.getAddon(e);
}
export function onInstall(e: unknown) {
  return onOpen(e);
}
