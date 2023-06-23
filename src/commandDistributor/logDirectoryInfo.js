import { currentPath } from '../const/currentPath.js';
import { readdir } from 'fs/promises';

export async function logDirectoryInfo() {
  const files = await readdir(currentPath.path, { withFileTypes: true });
  const displayFiles = files
  .map(el => ({name: el.name, type: el.isFile() ? 'file' : 'directory'}))
  .sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    } else {
      return a.type === 'directory' ? -1 : 1;
    }
  });
  console.table(displayFiles);
}
