import { rename } from 'fs/promises';
import { join, extname, isAbsolute, dirname } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';

export async function renameFile(arg) {
  const [filePathArg, newNameArg] = arg.split(' ').map((el) => el.trim());

  if (!filePathArg || !newNameArg) {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }

  let absoluteOldPath = join(currentPath.path, filePathArg);

  if (isAbsolute(filePathArg)) {
    absoluteOldPath = filePathArg;
  }

  const workDirectory = dirname(absoluteOldPath);
  const absoluteNewPath = join(workDirectory, newNameArg);

  const checkIsOldFile = await isFileAccessible(absoluteOldPath);
  const checkIsNewFile = await isFileAccessible(absoluteNewPath);
  const checkIsDirectory = await isDirectory(workDirectory);
  const extensionNewFile = extname(newNameArg);

  if (
    checkIsOldFile &&
    checkIsDirectory &&
    !checkIsNewFile &&
    extensionNewFile !== ''
  ) {
    try {
      await rename(absoluteOldPath, absoluteNewPath);
    } catch (error) {
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
