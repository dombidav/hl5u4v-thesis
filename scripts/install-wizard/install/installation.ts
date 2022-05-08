import {IConfig} from "../config.interface";
import {createSpinner} from "nanospinner";
import chalk from "chalk";

export async function installation(steps: { name: string; action: () => Promise<void> }[], config: IConfig) {
    for (let i = 0; i < steps.length; i++){
        console.clear()
        const step = steps[i]
        console.log(chalk.bgGreen.black(`${step.name} [${i+1} / ${steps.length}]...`))
        await step.action()
    }
}
