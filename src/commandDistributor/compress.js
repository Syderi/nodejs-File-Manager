import { createReadStream, createWriteStream } from 'fs';
import { join, extname, isAbsolute, dirname, basename, parse } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { isFileAccessible } from '../helper_utils/isFileAccessible.js';
import { isDirectory } from '../helper_utils/isDirectory.js';
import { createBrotliCompress } from 'zlib';

// compress C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager\a.txt C:\Users\SuperVisor\Desktop\FileNode\nodejs-File-Manager

export async function compress(arg, key = 'copy') {
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

  const { name: nameWritePathFile } = parse(absoluteReadPathFile);

  const absoluteWritePathFile = join(
    absoluteWritePathDirectory,
    `${nameWritePathFile}.br`
  );

  console.log('absoluteReadPathFile===', absoluteReadPathFile);
  console.log('absoluteWritePathFile===', absoluteWritePathFile);

  const readPathDirectory = dirname(absoluteReadPathFile);
  const writePathDirectory = absoluteWritePathDirectory;

  console.log('readPathDirectory===', readPathDirectory);
  console.log('writePathDirectory===', writePathDirectory);

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
      const compressStream = createBrotliCompress();
      readStream.pipe(compressStream).pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve());
        writeStream.on('error', reject());
      });
    } catch (error) {
      console.log(error)
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}
