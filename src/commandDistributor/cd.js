import { join, isAbsolute } from 'path';
import { ERRORS_MESSAGESS } from '../const/const.js';
import { currentPath } from '../const/currentPath.js';
import { SYSTEM_SLASH } from '../const/systemSlash.js';
import { isDirectory } from '../helper_utils/isDirectory.js';


export async function cd(inputPath) {

  if (!inputPath.endsWith(SYSTEM_SLASH)) {
    inputPath += SYSTEM_SLASH;
  }

  const newPath = join(currentPath.path, inputPath);

  if (isAbsolute(inputPath)) {
    if (await isDirectory(inputPath)) {
      currentPath.path = inputPath.slice(0, -1);
    } else {
      throw new Error(ERRORS_MESSAGESS.operationFailed);
    }
    return;
  }

  if (await isDirectory(newPath)) {
    currentPath.path = newPath.slice(0, -1);
  } else {
    throw new Error(ERRORS_MESSAGESS.operationFailed);
  }
}








































// export async function cd(inputPath) {
//   if (!inputPath.endsWith(SYSTEM_SLASH)) {
//     inputPath += SYSTEM_SLASH;
//   }

//   const newPath = join(currentPath.path, inputPath);

//   if (isAbsolute(inputPath)) {
//     try {
//       // await fs.access(inputPath, constants.F_OK);
//       const stats = await fs.stat(inputPath);
//       if (stats.isDirectory()) {
//         currentPath.path = inputPath.slice(0, -1);
//       } else {
//         throw new Error(ERRORS_MESSAGESS.operationFailed);
//       }
//       return;
//     } catch (error) {
//       throw new Error(ERRORS_MESSAGESS.operationFailed);
//     }
//   }

//   try {
//     // await fs.access(newPath, constants.F_OK);
//     const stats = await fs.stat(newPath);
//     if (stats.isDirectory()) {
//       currentPath.path = newPath.slice(0, -1);
//     } else {
//       throw new Error(ERRORS_MESSAGESS.operationFailed);
//     }
//     return;
//   } catch (error) {
//     throw new Error(ERRORS_MESSAGESS.operationFailed);
//   }
// }
