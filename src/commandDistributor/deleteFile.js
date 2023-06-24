import { unlink } from 'fs/promises';
import { join, extname, isAbsolute, dirname, basename } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';

export async function deleteFile(arg) {
  const filePathArg = arg.replace(/['"`]/g, '');

  if (!filePathArg) {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }

  let absolutePathFile = join(currentPath.path, filePathArg);

  if (isAbsolute(filePathArg)) {
    absolutePathFile = filePathArg;
  }

  const workDirectory = dirname(absolutePathFile);
  const fileReadName = basename(absolutePathFile);

  const checkIsFile = await isFileAccessible(absolutePathFile);
  const checkIsDirectory = await isDirectory(workDirectory);
  const checkExtensionNewFile = extname(fileReadName);

  if (checkIsFile && checkIsDirectory && checkExtensionNewFile !== '') {
    try {
      await unlink(absolutePathFile);
    } catch (error) {
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
