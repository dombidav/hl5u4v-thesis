import inquirer from "inquirer";
import {IMailerConfig} from "../config.interface";

export async function configMail() {
    return inquirer.prompt<IMailerConfig>([
        {
            type: 'input',
            name: 'host',
            message: 'What is the host of your mailer?',
            default: 'localhost'
        },
        {
            type: 'input',
            name: 'port',
            message: 'What is the port of your mailer?',
            default: '1025'
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is the username of your mailer? (default: empty)',
            default: ''
        },
        {
            type: 'password',
            name: 'password',
            message: 'What is the password of your mailer? (default: empty password)',
            default: ''
        },
        {
            type: 'input',
            name: 'from',
            message: 'What is the "from address" of your mailer?',
            default: 'info@local.test'
        }
    ]).then((answers) => {
        process.env.MAIL_HOST = answers.host
        process.env.MAIL_PORT = answers.port.toString()
        process.env.MAIL_USERNAME = answers.username
        process.env.MAIL_PASSWORD = answers.password
        process.env.MAIL_FROM_ADDRESS = answers.from
        return answers
    })
}
