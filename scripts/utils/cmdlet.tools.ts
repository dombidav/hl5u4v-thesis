import {SpawnOptionsWithoutStdio} from "child_process";
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

export async function cmdlet(cmd: string, options?: SpawnOptionsWithoutStdio | undefined): Promise<any> {
    return exec(cmd, options)
}
