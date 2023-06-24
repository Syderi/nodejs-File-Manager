import { ERRORS_MESSAGESS } from '../const/const.js';
import { up } from './up.js';
import { cd } from './cd.js';
import { logDirectoryInfo } from './logDirectoryInfo.js';
import { cat } from './cat.js';
import { addFile } from './addFile.js';
import { renameFile } from './renameFile.js';

export async function switchCommandDistributor(command) {
  const key = command.split(' ')[0].trim();
  const arg = command.slice(key.length).trim();
  // console.log(key, key.length);
  // console.log(arg, arg.length);
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

    default:
      throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
}
