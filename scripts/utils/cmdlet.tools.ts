import {SpawnOptionsWithoutStdio} from "child_process";
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

export async function cmdlet(cmd: string, options?: SpawnOptionsWithoutStdio | undefined): Promise<{stdout: string, stderr: string}> {
    return exec(cmd, options)
}
