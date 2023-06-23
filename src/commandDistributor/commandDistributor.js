import { up } from './up.js';

export async function commandDistributor(command) {
  const [key, arg1, arg2] = command.split(' ');

  switch (key) {
    case 'up':
      up();
      break;

    default:
      throw new Error(`\nInvalid input`);
  }
}
