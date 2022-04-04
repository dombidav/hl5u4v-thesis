const fs = require('fs')
const fsp = fs.promises
const envFile = `${__dirname}/../.env`

main()

function generateKey() {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_'
    const charactersLength = characters.length
    for (let i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    const buff = Buffer.from(result, 'utf8')
    result = buff.toString('base64')
    console.log(`> Generated key: ${result}`)
    return result
}

function replaceKey(env) {
    return env.replace(/^APP_KEY=(.+)?$/gmi, `APP_KEY=base64:${generateKey()}`)
}


async function main() {
    console.log('Generating APP_KEY...')
    console.log('> Reading current .env...')
    const env = await fsp.readFile(envFile, 'utf8')
    await fsp.writeFile(envFile, replaceKey(env), 'utf8')
    console.log('Done!')
}
