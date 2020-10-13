import {md5} from '../vendors/md5.vendor';
import {isUrl} from './helper.service';

// https://developers.google.com/apps-script/reference/cache/cache

export function getDocumentCache() {
  const cache = CacheService.getDocumentCache();
  if (!cache) {
    throw new Error('Error getting document cache.');
  }
  return cache;
}

export function buildCacheKey(value: string, prefix = 'CACHED') {
  return prefix + '_' + (isUrl(value) ? md5(value) : value);
}

export function getCache<Data>(key: string, raw = false) {
  let result = getDocumentCache().get(key) as string;
  // try to parse the json data
  if (!raw) {
    try {
      result = JSON.parse(result);
    } catch (e) {
      // not json or malform
    }
  }
  // final result
  return (result as unknown) as Data;
}

export function setCache<Data>(
  key: string,
  data: Data,
  /* seconds */ cacheTime = 60
) {
  getDocumentCache().put(
    key,
    typeof data === 'string' ? data : JSON.stringify(data),
    cacheTime
  );
  return data; // return original data
}

export function clearCache(key: string) {
  return getDocumentCache().remove(key);
}

export function clearCacheAll(keys: string[]) {
  return getDocumentCache().removeAll(keys);
}
