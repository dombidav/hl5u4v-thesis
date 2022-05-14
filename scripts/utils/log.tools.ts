import chalk from "chalk";

export function debug(from: string, message: string, ...args: any): void {
  if(parseInt(process.env.VERBOSE ?? '0') >= 1)
  console.log(chalk.blueBright(`[${from}]`) + `${message}`, ...args)
}
