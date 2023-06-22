import { rl } from './readline/createReadline.js';
import { processUserInput } from './processUserInput.js';
import { greetingsMessages } from './messages/greetingsMessages.js';
import { logCurrentPath } from './messages/logCurrentPath.js';

greetingsMessages();

logCurrentPath();

rl.setPrompt('\nEnter a command: ');
rl.prompt();
rl.on('line', processUserInput);
