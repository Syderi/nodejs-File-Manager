import { createReadStream } from 'fs';
import { join, isAbsolute } from 'path';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { currentPath } from '../const/currentPath.js';
import { rl } from '../readline/createReadline.js';
import { ERRORS_MESSAGESS } from '../const/const.js';

export async function cat(inputPath) {
  let catPath = join(currentPath.path, inputPath);
  if (isAbsolute(inputPath)) {
    catPath = inputPath;
  }
  const checkIsFile = await isFileAccessible(catPath);

  return new Promise((resolve, reject) => {
    if (checkIsFile) {
      const rs = createReadStream(catPath);
      rs.on('data', (data) => rl.output.write(data));
      rs.on('error', (error) => {
        reject(new Error(ERRORS_MESSAGESS.operationFailed));
      });
      rs.on('end', () => {
        resolve(); // Разрешить промис, когда чтение завершено
      });
    } else {
      reject(new Error(ERRORS_MESSAGESS.operationFailed));
    }
  });
}
