import { getUserName } from '../helper_utils/getUserName.js';

export function goodByeMessages() {
  console.log(`\nThank you for using File Manager, ${getUserName()}, goodbye!\n`);
}
