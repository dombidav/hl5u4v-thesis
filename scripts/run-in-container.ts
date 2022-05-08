import {spawn} from 'child_process'

const defaults = {
    apiContainerName: 'hl5u4v-thesis_laravel.test_1',
    uiContainerName: 'admin-panel',
    apiContainerCli: 'php artisan',
    uiContainerCli: 'ng'
}

main().then(exitCode => process.exit(exitCode))

async function main() {
    const [, , TARGET_CONTAINER, ...ARGS] = process.argv

    let targetContainerName = ''
    let targetContainerCLI = ''
    switch (TARGET_CONTAINER) {
        case 'api':
            targetContainerName = defaults.apiContainerName
            targetContainerCLI = defaults.apiContainerCli
            break
        case 'ui':
            targetContainerName = defaults.uiContainerName
            targetContainerCLI = defaults.uiContainerCli
            break
        default:
            console.error('Invalid container name')
            process.exit(1)
    }

    const command = `${targetContainerCLI} ${ARGS.join(' ')}`
    console.log(`Running '${command}' in ${targetContainerName}`)
    const ls = spawn(`docker exec -it ${targetContainerName} ${command}`, {
        shell: true,
        stdio: 'inherit'
    })

    return new Promise<number>((resolve, reject) => ls.on('close', code => {
        console.log(`${command} in ${targetContainerName} exited with code ${code}`)
        resolve(code || 0)
    }))
}
