import {chooseEnvironment} from './install-wizard/configure/choose-environment'
import {chooseDocker} from './install-wizard/configure/choose-docker'
import {checkPrerequisites, confirmContinue} from './install-wizard/install/check-prerequisites'
import {skipInstallWizard} from './install-wizard/skip-install-wizard'
import {configFrontend} from './install-wizard/configure/config-frontend'
import {configBackend} from './install-wizard/configure/config-backend'
import {configDatabase} from './install-wizard/configure/config-database'
import {configRedis} from './install-wizard/configure/config-redis'
import {chooseServices} from './install-wizard/configure/choose-services'
import {configMail} from './install-wizard/configure/config-mail'
import {configGit} from './install-wizard/configure/config-git'
import {configFactory, IConfig,} from './install-wizard/config.interface'
import {configHeroku} from './install-wizard/configure/config-heroku'
import {configApp} from "./install-wizard/configure/config-app";
import chalk from "chalk";
import inquirer from "inquirer";
import {getSteps} from "./install-wizard/install/get-steps";
import {installation} from "./install-wizard/install/installation";

export let config: IConfig = configFactory()

async function confirmConfig(config: IConfig) {
    console.log(chalk.bgGreen.black('Configuration'))
    console.log(config)
    const steps = getSteps(config)
    console.log('Install wizard steps:')
    steps.forEach(step => console.log(chalk.green(`- ${step.name}`)))
    await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Continue with this configuration?',
        },
    ]).then(({confirm}) => {
        if (!confirm) {
            process.exit(0)
        }
    })
    return true
}

async function getConfiguration() {
    config.app = await configApp()
    config.environment = await chooseEnvironment()
    config.docker = await chooseDocker()
    config.services = (await chooseServices()).services
    config.backend = await configBackend()
    config.database = await configDatabase()
    if (config.services.includes('frontend'))
        config.frontend = await configFrontend()
    if (config.services.includes('redis'))
        config.redis = await configRedis()
    if (config.services.includes('mailer'))
        config.mailer = await configMail()
    if (config.services.includes('git'))
        config.git = await configGit()
    if (config.services.includes('heroku'))
        config.heroku = await configHeroku(config)
    const prerequisites = await checkPrerequisites(config)
    if (prerequisites.some(p => !p))
        await confirmContinue()
}

async function main() {
    if(process.argv.includes('--verbose=1') || process.argv.includes('--verbose') || process.argv.includes('-v')) {
        process.env.VERBOSE = '1'
    }
    if(process.argv.includes('--verbose=2') || process.argv.includes('-vv')) {
        process.env.VERBOSE = '2'
    }
    if(process.argv.includes('--verbose=3') || process.argv.includes('-vvv')) {
        process.env.VERBOSE = '3'
    }
    if (await skipInstallWizard())
        return 0
    await getConfiguration()

    const steps = getSteps(config)
    if (await confirmConfig(config))
    {
        await installation(steps, config)
    }
    return 0
}

main().then((c) => process.exit(c))
