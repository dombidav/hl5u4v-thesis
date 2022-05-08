import inquirer from "inquirer";
import {IGitConfig} from "../config.interface";

export async function configGit() {
    return inquirer.prompt<IGitConfig>([
        {
            type: 'list',
            name: 'type',
            message: 'What is the type of your git?',
            choices: [
                {
                    name: 'GitHub',
                    value: 'github',
                    checked: true
                },
                {
                    name: 'GitLab',
                    value: 'gitlab'
                },
                {
                    name: 'Bitbucket',
                    value: 'bitbucket'
                },
                {
                    name: 'Custom',
                    value: 'custom'
                }
            ]
        },
        {
            type: 'confirm',
            name: 'ghRepo',
            message: 'Do you want to create a new repository on GitHub? (This requires GitHub CLI)',
            when: answers => answers.type === 'github',
        },
        {
            type: 'input',
            name: 'ghRepoName',
            message: 'What is the name of the repository?',
            when: answers => answers.type === 'github' && answers.ghRepo,
            default: 'acs-app'
        },
        {
            type: 'list',
            name: 'ghRepoVisibility',
            message: 'What is the visibility of the repository?',
            when: answers => answers.type === 'github' && answers.ghRepo,
            choices: [
                {
                    name: 'Public',
                    value: 'public',
                },
                {
                    name: 'Private',
                    value: 'private',
                }
            ]
        }
    ])
}
