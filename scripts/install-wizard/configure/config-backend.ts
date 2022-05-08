import inquirer from "inquirer";
import {IBackendConfig} from "../config.interface";

export async function configBackend() {
    return inquirer.prompt<IBackendConfig>([
        {
            type: 'input',
            name: 'host',
            message: 'What is the URI of your backend application?',
            default: 'http://localhost:8080'
        }
    ]).then((answers) => {
      process.env.APP_URL = answers.host
      return answers
    })
}
