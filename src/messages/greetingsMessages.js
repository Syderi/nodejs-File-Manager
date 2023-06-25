import { getUserName } from '../helper_utils/getUserName.js';

export function greetingsMessages() {
  console.log(`\nWelcome to the File Manager, ${getUserName()}!`);
}
