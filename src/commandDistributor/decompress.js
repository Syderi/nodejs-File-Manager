import { createReadStream, createWriteStream } from 'fs';
import { join, extname, isAbsolute, dirname, basename, parse } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';
import { createBrotliDecompress } from 'zlib';

// decompress C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager\a.txt.br C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager

export async function decompress(arg) {
  const [pathToReadFile, pathToWriteDirectory] = arg
    .split(' ')
    .map((el) => el.trim().replace(/['"`]/g, ''));

  if (!pathToReadFile || !pathToWriteDirectory) {
    throw new Error(ERRORS_MESSAGESS.invalidInput);
  }

  let absoluteReadPathFile = join(currentPath.path, pathToReadFile);

  if (isAbsolute(pathToReadFile)) {
    absoluteReadPathFile = pathToReadFile;
  }
  const fileReadName = basename(absoluteReadPathFile);

  let absoluteWritePathDirectory = join(currentPath.path, pathToWriteDirectory);

  if (isAbsolute(pathToWriteDirectory)) {
    absoluteWritePathDirectory = pathToWriteDirectory;
  }

  const absoluteWritePathFile = join(
    absoluteWritePathDirectory,
    `${fileReadName.slice(0, -3)}`
  );

  const readPathDirectory = dirname(absoluteReadPathFile);
  const writePathDirectory = absoluteWritePathDirectory;

  const checkIsFileRead = await isFileAccessible(absoluteReadPathFile);
  const checkIsFileWrite = await isFileAccessible(absoluteWritePathFile);
  const checkIsReadPathDirectory = await isDirectory(readPathDirectory);
  const checkIsWritePathDirectory = await isDirectory(writePathDirectory);
  const checkExtensionFileReadName = extname(fileReadName);

  if (
    checkIsFileRead &&
    !checkIsFileWrite &&
    checkIsReadPathDirectory &&
    checkIsWritePathDirectory &&
    checkExtensionFileReadName !== ''
  ) {
    try {
      const readStream = createReadStream(absoluteReadPathFile);
      const writeStream = createWriteStream(absoluteWritePathFile);
      const decompressStream = createBrotliDecompress();

      // const compressionPromise = new Promise((resolve, reject) => {
      // writeStream.on('finish', ());
      readStream.on('error', () => {
        throw new Error(ERRORS_MESSAGESS.operationFailed);
      });
      writeStream.on('error', () => {
        throw new Error(ERRORS_MESSAGESS.operationFailed);
      });
      decompressStream.on('error', () => {
        throw new Error(ERRORS_MESSAGESS.operationFailed);
      });
      // });

      readStream.pipe(decompressStream).pipe(writeStream);
      // await compressionPromise;
    } catch (error) {
      // console.log(error);
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
