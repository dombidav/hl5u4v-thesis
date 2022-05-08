import {IConfig} from "../config.interface";
import {existsSync, promises} from "fs";
import {getEnv} from "../../utils/object.tools";

export async function writeEnv(config: IConfig, VARIABLE_REGEX: RegExp) {
    if(existsSync('.env'))
        await promises.writeFile('backup.env',
        `# ${new Date().toISOString()}.\n${(await promises.readFile('.env', 'utf8'))}`
        )

    let env = (await promises.readFile('env.cli-template')).toString()
    const matches = env.matchAll(VARIABLE_REGEX)
    for (const match of matches)
        env = env.replace(match[0], getEnv<string>(match[1], config) ?? match[2])
    await promises.writeFile('.env', env)
}
