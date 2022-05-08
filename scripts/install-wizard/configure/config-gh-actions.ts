import {IConfig} from "../config.interface";
import chalk from "chalk";

export async function configGhActions(config: IConfig) {
    if (config.services?.includes('redis')) {
        console.log(chalk.yellow('\n Warning: You are using redis as a cache driver. Which can not be used in github action yet. Usually this is only means file cache will be used for testing. \n'))
    }

    return config
}
