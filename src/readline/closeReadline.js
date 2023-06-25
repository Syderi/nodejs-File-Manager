import { rl } from './createReadline.js';
import { goodByeMessages } from '../messages/goodByeMessages.js';

export function closeReadline() {
  goodByeMessages();
  rl.close();
  process.exit(0);
}
