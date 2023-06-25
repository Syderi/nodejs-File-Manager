import { createReadStream, createWriteStream } from 'fs';
import { join, extname, isAbsolute, dirname, basename } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';
import { createBrotliCompress } from 'zlib';

// compress C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager\a.txt C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager

export async function compress(arg) {
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
    `${fileReadName}.br`
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
    const readStream = createReadStream(absoluteReadPathFile);
    const writeStream = createWriteStream(absoluteWritePathFile);
    const compressStream = createBrotliCompress();

    const compressionPromise = new Promise((resolve, reject) => {
      writeStream.on('finish', resolve());
      writeStream.on('error', reject());
      compressStream.on('error', reject());
    });

    readStream.pipe(compressStream).pipe(writeStream);
    try {
      await compressionPromise;
    } catch (error) {
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
