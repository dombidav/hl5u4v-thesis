import {IConfig} from "../config.interface";
import {createSpinner} from "nanospinner";
import chalk from "chalk";
import inquirer from "inquirer";

export async function installation(steps: { name: string; action: () => Promise<void> }[], config: IConfig) {
    for (let i = 0; i < steps.length; i++){
        console.clear()
        const step = steps[i]
        console.log(chalk.bgGreen.black(`${step.name} [${i+1} / ${steps.length}]...`))
        try {
            await step.action()
        } catch (e) {
            console.log(chalk.bgRed.black(`Failed: ${step.name} [${i+1} / ${steps.length}]...`))
            console.error(e)
            const input = await inquirer.prompt([{
                type: "confirm",
                name: "continue",
                message: "Continue?",
                default: true
            }])
            if (!input.continue)
                process.exit(1)
        }
    }
}
