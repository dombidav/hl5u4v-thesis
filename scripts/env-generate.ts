import fs from 'fs'
import {config} from 'dotenv'
const fsp = fs.promises
config()

main().then(exitCode => process.exit(exitCode))

async function main() {
    console.log('Generating environment variables...')
    await copyEnv()
    await createEnvTS()
    console.log('Done! ✓✓✓')
    return 0
}


async function copyEnv() {
    console.log('> Creating .env for webservice...')
    console.log('> Checking if .env exists...')
    if(!fs.existsSync(`${__dirname}/../.env`)) {
        console.warn('> ! No .env file found. Skipping copy')
        return
    }

    console.log('> Copying .env to webservice/.env...')
    await fsp.copyFile(`${__dirname}/../.env`, `${__dirname}/../webservice/.env`)
    console.log('> ✓ .env file copied')
}

async function createEnvTS() {
    console.log('> Creating environment.ts for admin-panel...')
    const properties = ['APP_URL']
    const res: {[key: string]: any} = {production: process.env.APP_ENV === 'production'}
    console.log('> env.ts will be created with the following properties: APP_ENV, ', properties.join(', '))
    for(const prop of properties) {
        res[prop] = process.env[prop]
    }
    const content = `export const environment = ${JSON.stringify(res, null, 2)}`
    console.log('> Writing environment.ts...')
    await fsp.writeFile(`${__dirname}/../admin-panel/src/environments/environment.ts`, content)
    console.log('> ✓ environment.ts ready')
}
