import inquirer from "inquirer";

export async function chooseDocker() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'docker',
            message: 'Choose the docker environment',
            choices: [
                {
                    name: 'Laravel Sail',
                    value: 'sail'
                },
                {
                    name: 'Native (No docker)',
                    value: 'native'
                }
            ]
        }
    ])
}
