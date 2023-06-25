import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { join, extname, isAbsolute, dirname, basename } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';
import { splitArguments } from '../helper_utils/splitArguments.js';

export async function copyFile(arg, key = 'copy') {
  const [pathToReadFile, pathToWriteDirectory] = splitArguments(arg);

  if (!pathToReadFile || !pathToWriteDirectory) {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }

  let absoluteReadPathFile = join(currentPath.path, pathToReadFile);

  if (isAbsolute(pathToReadFile)) {
    absoluteReadPathFile = pathToReadFile;
  }

  const fileReadName = basename(absoluteReadPathFile);

  let absoluteWritePathFile = join(
    currentPath.path,
    pathToWriteDirectory,
    fileReadName
  );

  if (isAbsolute(pathToWriteDirectory)) {
    absoluteWritePathFile = join(pathToWriteDirectory, fileReadName);
  }

  const writePathDirectory = dirname(absoluteWritePathFile);
  const readPathDirectory = dirname(absoluteReadPathFile);

  const checkIsFileRead = await isFileAccessible(absoluteReadPathFile);
  const checkIsFileWrite = await isFileAccessible(absoluteWritePathFile);
  const checkIsReadPathDirectory = await isDirectory(readPathDirectory);
  const checkIsWritePathDirectory = await isDirectory(writePathDirectory);
  const checkExtensionNewFile = extname(fileReadName);

  if (
    checkIsFileRead &&
    !checkIsFileWrite &&
    checkIsReadPathDirectory &&
    checkIsWritePathDirectory &&
    checkExtensionNewFile !== ''
  ) {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(absoluteReadPathFile);
      const writeStream = createWriteStream(absoluteWritePathFile);
      readStream.on('error', (error) => {
        reject(new Error(ERRORS_MESSAGESS.operationFailed));
      });

      writeStream.on('error', (error) => {
        reject(new Error(ERRORS_MESSAGESS.operationFailed));
      });

      writeStream.on('finish', async () => {
        if (key === 'move') {
          try {
            await unlink(absoluteReadPathFile);
          } catch (error) {
            throw new Error(ERRORS_MESSAGESS.operationFailed);
          }
        }
        resolve();
      });

      readStream.pipe(writeStream);
    });
  } else {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
}
