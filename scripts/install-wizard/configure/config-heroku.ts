import {IConfig, IHerokuConfig} from '../config.interface'
import chalk from 'chalk'
import inquirer from 'inquirer'
import {getEnv} from "../../utils/object.tools";

export async function configHeroku(config: IConfig) {
    if (config.database.driver === 'mysql') {
        console.log(chalk.yellow('\nWarning: MySQL is a premium addon on Heroku.\n'))
    }
    return inquirer.prompt<IHerokuConfig>([
        {
            type: 'input',
            name: 'appName',
            message: 'Enter the name of the Heroku app',
            default: config.app.name
        },
        {
            type: 'list',
            name: 'region',
            message: 'Select the region',
            choices: [
                {
                    name: 'Europe',
                    value: 'eu'
                },
                {
                    name: 'United States',
                    value: 'us'
                }
            ],
        },
        {
            type: 'list',
            name: 'databaseAddon',
            message: 'Select the database addon (Does not change the local database config.)',
            choices: [
                {
                    name: 'PostgreSQL (free)',
                    value: 'heroku-postgresql:hobby-dev',
                },
                {
                    name: 'MySQL (premium)',
                    value: 'ah-mysql-stackhero:ist-kqor2t',
                }
            ]
        }
    ])
}

export function herokuCmdlets(config: IConfig) {
    return [
        `heroku create ${getEnv('APP_NAME', config)} --region=eu --buildpack heroku/nodejs`,
        `heroku buildpacks:add --index 1 heroku/php`,
        `heroku addons:create heroku-redis:hobby-dev -a ${getEnv('APP_NAME', config)}`,
        `heroku addons:create heroku-postgresql:hobby-dev -a ${getEnv('APP_NAME', config)}`,
        `heroku git:remote -a ${getEnv('APP_NAME', config)}`,
    ]
}
