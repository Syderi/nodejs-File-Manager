import { currentPath } from '../const/currentPath.js';
import { SYSTEM_SLASH } from '../const/systemSlash.js';

export function up() {
  const parts = currentPath.path.split(SYSTEM_SLASH);
  if (parts.length > 1) {
    parts.pop();
    currentPath.path = parts.join(SYSTEM_SLASH);
  }
}
