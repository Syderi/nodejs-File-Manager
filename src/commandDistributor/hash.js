import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { join, extname, isAbsolute, dirname, basename } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';
import { rl } from '../readline/createReadline.js';

// hash C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager\readme.md

export async function hash(arg) {
  const filePathArg = arg.replace(/['"`]/g, '');

  if (!filePathArg) {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
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
      const data = await readFile(absolutePathFile);
      const hash = createHash('sha256').update(data).digest('hex');
      rl.output.write(`\n${hash}\n`);
      return;
    } catch (error) {
      reject(new Error(ERRORS_MESSAGESS.operationFailed));
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
}
