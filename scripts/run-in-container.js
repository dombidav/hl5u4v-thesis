const API_CONTAINER_NAME = 'hl5u4v-thesis_laravel.test_1'
const UI_CONTAINER_NAME = 'admin-panel'
const API_CONTAINER_CLI = 'php artisan'
const UI_CONTAINER_CLI = 'ng'

const {spawn} = require('child_process')
const [, , TARGET_CONTAINER, ...ARGS] = process.argv

let targetContainerName = ''
let targetContainerCLI = ''
switch (TARGET_CONTAINER) {
    case 'api':
        targetContainerName = API_CONTAINER_NAME
        targetContainerCLI = API_CONTAINER_CLI
        break
    case 'ui':
        targetContainerName = UI_CONTAINER_NAME
        targetContainerCLI = UI_CONTAINER_CLI
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

ls.on('close', code => {
    console.log(`${command} in ${targetContainerName} exited with code ${code}`)
    process.exit(code)
})
