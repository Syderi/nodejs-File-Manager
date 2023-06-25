import { currentPath } from '../const/currentPath.js';
import { SYSTEM_SLASH } from '../const/systemSlash.js';
import { platform } from 'node:process';

export function up() {
  const parts = currentPath.path.split(SYSTEM_SLASH);
  if (platform !== "win32") {parts.shift()};

  if (parts.length > 1) {
    parts.pop();
    currentPath.path = parts.join(SYSTEM_SLASH);
  } else {
    if (platform === "win32") return;
    if (platform !== "win32") {
      currentPath.path = SYSTEM_SLASH;
    }
  }
}
