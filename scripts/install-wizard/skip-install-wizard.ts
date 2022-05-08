import inquirer from "inquirer";

export async function skipInstallWizard() {
    return inquirer.prompt<Record<string, boolean>>([{
        type: 'confirm',
        name: 'run',
        message: 'Do you want to run the config wizard?',
        default: false
    }]).then(answers => !answers.run)
}
