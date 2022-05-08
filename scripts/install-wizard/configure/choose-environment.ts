import inquirer from "inquirer";

export async function chooseEnvironment() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'environment',
            message: 'Choose the environment',
            choices: [
                {
                    name: 'Local',
                    value: 'local'
                },
                {
                    name: 'Production',
                    value: 'production'
                }
            ]
        }
    ]).then(answers => {
        process.env.APP_ENV = answers.environment
        return answers.environment
    })
}
