import chalk from 'chalk';

export default class Logging {

  public static log = (args: any) => this.info(args)

  public static info = (args: any) => {
    console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk.blueBright(args) : args);
  }
  public static infoNL = (args: any) => {
    console.log(`\n${chalk.blue(`[${new Date().toLocaleString()}] [INFO] `)}`, typeof args === 'string' ? chalk.blueBright(args) : args);
  }

  public static warn = (args: any) => {
    console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `), typeof args === 'string' ? chalk.yellowBright(args) : args);
  }

  public static error = (args: any) => {
    console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `), typeof args === 'object' ? chalk.redBright(args.message) : chalk.redBright(args));
    console.log(args.stack);
  }

}
