import fs from 'fs';
import zlib from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'archive.gz');
const filePathToDecompress = path.join(
  __dirname,
  'files',
  'fileToCompress.txt'
);

export const decompress = async () => {
  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(filePathToDecompress);
  const gunzip = zlib.createGunzip();
  readStream.pipe(gunzip).pipe(writeStream);

  readStream.on('error', (error) => {
    if (error) {
      throw Error('FS operation failed - File open failed');
    }
  });
  writeStream.on('error', (error) => {
    if (error) {
      throw Error('FS operation failed - File write failed');
    }
  });
  gunzip.on('error', (error) => {
    if (error) {
      throw Error('FS operation failed -Decompression failed');
    }
  });
};

// await decompress();
