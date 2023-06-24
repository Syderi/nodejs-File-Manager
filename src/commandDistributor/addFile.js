import { appendFile } from 'fs/promises';
import { join, extname } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';

export async function addFile(fileName) {
  const filePath = join(currentPath.path, fileName);
  const checkIsFile = await isFileAccessible(filePath);

  if (checkIsFile) {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
  if (extname(fileName) === '') {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }

  try {
    await appendFile(filePath, '');
  } catch (error) {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
