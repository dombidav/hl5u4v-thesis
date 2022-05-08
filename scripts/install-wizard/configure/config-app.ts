import inquirer from "inquirer";
import {IAppConfig} from "../config.interface";

export async function configApp() {
    return inquirer.prompt<IAppConfig>([
        {
            type: 'input',
            name: 'name',
            message: 'Application name',
            default: 'acs'
        }
    ]).then(answers => {
        process.env.APP_NAME = answers.name
        return answers
    })
}
