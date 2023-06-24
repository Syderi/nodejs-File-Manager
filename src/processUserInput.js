import { rl } from './readline/createReadline.js';
import { logCurrentPath } from './messages/logCurrentPath.js';
import { closeReadline } from './readline/closeReadline.js';
import { switchCommandDistributor } from './commandDistributor/switchCommandDistributor.js';

// Функция для обработки ввода пользователя
export async function processUserInput(input) {
  const command = input.trim();

  if (command === '.exit') closeReadline();

  try {
    await switchCommandDistributor(command);
  } catch (error) {
    console.error(error.message);
  }

  logCurrentPath();
  rl.prompt();
}

// Обработка выхода по нажатию Ctrl+C
rl.on('SIGINT', () => {
  closeReadline();
});
