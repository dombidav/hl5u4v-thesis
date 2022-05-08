import inquirer from "inquirer";
import {createSpinner} from "nanospinner";
import {ExecException} from "child_process";
import chalk from "chalk";
import semver from "semver";
import {IConfig} from "../config.interface";

async function checkPre(cmdlet: string, minVersion: string): Promise<boolean> {
    return new Promise(((resolve, reject) => {
        const spinner = createSpinner(cmdlet)
        spinner.start()
        const exec = require('child_process').exec
        const cmd = `${cmdlet} --version`
        exec(cmd, (error: ExecException | null, stdout: string, stderr: string) => {
            if (error) {
                spinner.error({text: chalk.red(`${cmdlet} is not installed`)})
                reject(error)
            } else {
                const version = stdout.match(/\d+\.\d+\.\d+/)?.[0] ?? '0.0.0'
                if (!semver.satisfies(version, minVersion, {})) {
                    spinner.error({text: chalk.red(`${cmdlet} version is ${version} but ${minVersion} is required`)})
                    reject(new Error(`${cmdlet} version is ${version} but ${minVersion} is required`))
                } else {
                    spinner.success({text: chalk.green(`${cmdlet} (${version}) version is ok`)})
                    resolve(true)
                }
            }
        })
    }))
}

export async function checkPrerequisites(config: IConfig): Promise<boolean[]> {
    const spinner = createSpinner('Checking prerequisites').start()
    const promises = [
        checkPre('node', '>=14.0.0').then(),
        checkPre('yarn', '>=1.0.0').then(),
    ]
    if(config.docker === 'native') {
        promises.push(checkPre('php', '>=8.1.0').then())
        promises.push(checkPre('composer', '>=2.0.0').then())
    }

    if(config.frontend?.frontend === 'angular') {
        promises.push(checkPre('ng', '>=13.0.0').then())
        promises.push(checkPre('ionic', '>=6.18.0').then())
    }

    if(config.services.includes('git')) {
        promises.push(checkPre('git', '>=2.35.0').then())
    }

    if(config.services.includes('ghActions')) {
        promises.push(checkPre('gh', '>=2.4.0').then())
    }

    if(config.services.includes('heroku')) {
        promises.push(checkPre('heroku', '>=7.0.0').then())
    }
    const res = Promise.all(promises)
    res.then(() => spinner.stop())
    return res
}

export async function confirmContinue() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Some prerequisites are not satisfied. Continue?',
            default: false
        }
    ]).then((answers) => {
        if (!answers.continue) {
            process.exit(0)
        }
    })
}
