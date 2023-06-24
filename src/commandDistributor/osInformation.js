import { rl } from '../readline/createReadline.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { ERRORS_MESSAGESS } from '../const/const.js';

export const osInformation = (key) => {
  switch (key) {
    case '--EOL':
      rl.output.write(JSON.stringify(EOL));
      break;
    case '--cpus':
      const cpusArrayRespons = cpus();

      rl.output.write(`\noverall amount of CPUS: ${cpusArrayRespons.length}\n`);
      console.table(
        cpusArrayRespons.map((el) => ({
          model: el.model,
          'clock rate': `${+el.speed / 1000} GHz`,
        }))
      );
      break;
    case '--homedir':
      rl.output.write(homedir());
      break;
    case '--username':
      rl.output.write(userInfo().username);
      break;
    case '--architecture':
      rl.output.write(arch());
      break;
    default:
      throw new Error(ERRORS_MESSAGESS.invalidInput);
  }
};
