import readline from 'readline';

// Создание интерфейса для чтения ввода пользователя
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
