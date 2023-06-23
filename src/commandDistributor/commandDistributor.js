import { ERRORS_MESSAGESS } from '../const/const.js';
import { up } from './up.js';
import { cd } from './cd.js';

export async function commandDistributor(command) {
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

    default:
      throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
}
