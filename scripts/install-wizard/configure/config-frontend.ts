import inquirer from "inquirer";
import {IFrontendConfig} from "../config.interface";

export async function configFrontend() {
    return inquirer.prompt<IFrontendConfig>([
        {
            type: 'list',
            name: 'frontend',
            message: 'Choose the frontend framework',
            choices: [
                {
                    name: 'Angular',
                    value: 'angular'
                },
                {
                    name: 'React',
                    disabled: 'Not supported yet',
                    value: 'react'
                },
                {
                    name: 'Vue',
                    disabled: 'Not supported yet',
                    value: 'vue'
                },
                {
                    name: 'Svelte',
                    disabled: 'Not supported yet',
                    value: 'svelte'
                }
            ]
        },
        {
            type: 'input',
            name: 'host',
            message: 'What is the URI of your frontend application?',
            default: 'http://localhost:3000',
        }
    ])
}
