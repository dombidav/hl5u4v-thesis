import inquirer from "inquirer";
import {IRedisConfig} from "../config.interface";

export async function configRedis() {
    return inquirer.prompt<IRedisConfig>([
        {
            type: 'input',
            name: 'host',
            message: 'What is the URI of your redis?',
            default: 'localhost'
        },
        {
            type: 'input',
            name: 'port',
            message: 'What is the port of your redis?',
            default: '6379'
        },
        {
            type: 'password',
            name: 'password',
            message: 'What is the password of your redis? (default: empty password)',
            default: ''
        }
    ]).then(answers => {
        process.env.CACHE_DRIVER = 'redis'
        process.env.REDIS_HOST = answers.host
        process.env.REDIS_PORT = answers.port.toString()
        process.env.REDIS_PASSWORD = answers.password
        return answers
    })
}
