import { rl } from './readline/createReadline.js';
import { currentPath } from './const/currentPath.js';
import { logCurrentPath } from './messages/logCurrentPath.js';
import { closeReadline } from './readline/closeReadline.js';
import { SYSTEM_SLASH } from './const/systemSlash.js';

// Функция для обработки ввода пользователя
export async function processUserInput(input) {
  const command = input.trim();

  if (command === '.exit') closeReadline();

  currentPath.path = currentPath.path + `${SYSTEM_SLASH}1`;
  console.log(`\nInvalid input: ${command}`);

  logCurrentPath();
  rl.prompt();
}

// Обработка выхода по нажатию Ctrl+C
rl.on('SIGINT', () => {
  closeReadline();
});
