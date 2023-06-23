import { access , stat} from 'fs/promises';
import { constants } from 'fs';

export async function isFileAccessible(path) {
  try {
    const stats = await stat(path);

    if (stats.isFile()) {
      await access(path, constants.R_OK | constants.W_OK);
      return true; // Файл доступен для чтения и записи
    } else {
      return false; // Путь указывает на директорию, а не на файл
    }
  } catch (error) {
    return false; // Файл не доступен или не существует
  }
}