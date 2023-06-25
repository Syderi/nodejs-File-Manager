import os from 'os';

export function getStartHomedir() {
  return os.homedir().toString();
}
