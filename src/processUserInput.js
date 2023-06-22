import { rl } from './readline/createReadline.js';
import { goodByeMessages } from './messages/goodByeMessages.js';
import { currentPath } from './const/currentPath.js';
import { logCurrentPath } from './messages/logCurrentPath.js';

// Функция для обработки ввода пользователя
export function processUserInput(input) {
  const command = input.trim();

  if (command === '.exit') {
    goodByeMessages();
    rl.close();
    process.exit(0);
  } else {
    // Вывод остальных команд, пока не реализованы
    currentPath.path = currentPath.path + '/1';
    console.log(`\nInvalid input: ${command}`);
  }

  // Обработка выхода по нажатию Ctrl+C
  rl.on('SIGINT', () => {
    goodByeMessages();
    rl.close();
    process.exit(0);
  });

  logCurrentPath();
  rl.setPrompt('\nEnter a command: ');
  rl.prompt();
}
