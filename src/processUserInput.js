import { rl } from './readline/createReadline.js';
import { currentPath } from './const/currentPath.js';
import { logCurrentPath } from './messages/logCurrentPath.js';
import { closeReadline } from './readline/closeReadline.js';
import { SYSTEM_SLASH } from './const/systemSlash.js';
import { commandDistributor } from './commandDistributor/commandDistributor.js';

// Функция для обработки ввода пользователя
export async function processUserInput(input) {
  const command = input.trim();

  if (command === '.exit') closeReadline();

  try {
    await commandDistributor(command);
  } catch (error) {
    console.error(error.message);
    // console.log(`\nInvalid input: ${command}`);
    // Выполнять дополнительные действия в случае ошибки
  }

  // currentPath.path = currentPath.path + `${SYSTEM_SLASH}1`;

  logCurrentPath();
  rl.prompt();
}

// Обработка выхода по нажатию Ctrl+C
rl.on('SIGINT', () => {
  closeReadline();
});
