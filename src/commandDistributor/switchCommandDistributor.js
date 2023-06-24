import { ERRORS_MESSAGESS } from '../const/const.js';
import { up } from './up.js';
import { cd } from './cd.js';
import { logDirectoryInfo } from './logDirectoryInfo.js';
import { cat } from './cat.js';
import { addFile } from './addFile.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { deleteFile } from './deleteFile.js';

export async function switchCommandDistributor(command) {
  const key = command.split(' ')[0].trim();
  const arg = command.slice(key.length).trim();
  switch (key) {
    case 'up':
      up();
      break;
    case 'cd':
      await cd(arg);
      break;
    case 'ls':
      await logDirectoryInfo();
      break;
    case 'cat':
      await cat(arg);
      break;
    case 'add':
      await addFile(arg);
      break;
    case 'rn':
      await renameFile(arg);
      break;
    case 'cp':
      await copyFile(arg);
      break;
    case 'mv':
      await copyFile(arg, 'move');
      break;
    case 'rm':
      await deleteFile(arg);
      break;

    default:
      throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
}
