import inquirer from "inquirer";
import {IDatabaseConfig} from "../config.interface";

export async function configDatabase(fixProps: Partial<IDatabaseConfig> = {}): Promise<IDatabaseConfig> {
    return inquirer.prompt<IDatabaseConfig>(
        [
            {
                type: 'list',
                name: 'driver',
                message: 'Choose the database driver',
                when: () => !fixProps.driver,
                choices: [
                    {
                        name: 'MySQL',
                        value: 'mysql'
                    },
                    {
                        name: 'PostgreSQL',
                        value: 'pgsql'
                    },
                    {
                        name: 'SQLite',
                        value: 'sqlite'
                    },
                    {
                        name: 'MongoDB',
                        value: 'mongodb'
                    }
                ]
            },
            {
                type: 'input',
                name: 'host',
                when: () => !fixProps.host,
                message: 'What is the URI of your database?',
                default: 'localhost'
            },
            {
                type: 'input',
                name: 'port',
                when: () => !fixProps.port,
                message: 'What is the port of your database?',
                default: '3306'
            },
            {
                type: 'input',
                name: 'username',
                when: () => !fixProps.username,
                message: 'What is the username of your database?',
                default: 'root'
            },
            {
                type: 'password',
                name: 'password',
                when: () => !fixProps.password,
                message: 'What is the password of your database? (default: empty password)',
                default: ''
            },
            {
                type: 'input',
                name: 'database',
                when: () => !fixProps.database,
                message: 'What is the name of your database?',
                default: 'acs'
            }
        ]
    ).then(answers => {
        process.env.DB_CONNECTION = answers.driver
        process.env.DB_HOST = answers.host
        process.env.DB_PORT = answers.port.toString()
        process.env.DB_USERNAME = answers.username
        process.env.DB_PASSWORD = answers.password
        process.env.DB_DATABASE = answers.database
        return answers
    })
}
