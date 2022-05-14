import {cmdlet} from '../../utils/cmdlet.tools'

export async function retrieveHerokuConfig(herokuAppName: string): Promise<Record<string, string>> {
    const output = (await cmdlet(`heroku config --app=${herokuAppName} --json`)).stdout
    return JSON.parse(output)
}
