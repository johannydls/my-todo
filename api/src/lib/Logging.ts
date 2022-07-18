import chalk from 'chalk';

export default class Logging {

  public static log = (args: any) => this.info(args)

  public static sys = (args: any) => {
    console.log(chalk.cyan(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk.cyanBright(args) : args);
  }

  public static sysNL = (args: any) => {
    console.log(`\n${chalk.cyan(`[${new Date().toLocaleString()}] [INFO] `)}`, typeof args === 'string' ? chalk.cyanBright(args) : args);
  }

  public static info = (args: any) => {
    console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk.blueBright(args) : args);
  }

  public static infoRequest = (args: any) => {
    console.log(chalk.green(`[${new Date().toLocaleString()}] [REQUEST] `), typeof args === 'string' ? chalk.greenBright(args) : args);
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
