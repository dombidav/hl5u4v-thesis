import inquirer from "inquirer";

export async function chooseServices() {
    return inquirer.prompt<{ services: string[] }>([
        {
            type: 'checkbox',
            name: 'services',
            message: 'Choose the services you want to configure',
            loop: true,
            choices: [
                {
                    name: 'Frontend',
                    value: 'frontend'
                },
                {
                    name: 'Redis Cache',
                    value: 'redis',
                },
                {
                    name: 'Mailer',
                    value: 'mailer'
                },
                {
                    name: 'Git',
                    value: 'git'
                },
                {
                    name: 'Github Actions',
                    value: 'ghActions',
                },
                {
                    name: 'Heroku',
                    value: 'heroku',
                }
            ]
        }
    ])
}
