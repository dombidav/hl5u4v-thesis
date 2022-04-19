const prompt = require('prompt')
const config = {}

async function get(props) {
    return new Promise((resolve, reject) => {
        prompt.start()
        prompt.get(props, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function chooseEnvironment() {
    console.log('Choose environment:')
    console.log('1. Laravel Sail (Docker)')
    console.log('2. Native run')
    console.log('3. Cancel')
    const inp = await get({
        properties: {
            environment: {
                description: 'Choose environment',
                type: 'number',
                required: true,
                message: 'Choose environment',
                conform: function (value) {
                    return value >= 1 && value <= 3
                }
            }
        }
    })
    switch (inp.environment) {
        case 1:
            config.environment = 'laravel-sail'
            break
        case 2:
            config.environment = 'native'
            break
        case 3:
            process.exit(1)
            break
    }
}

async function configDatabase() {
    console.log('Config database:')
    const inp = await get({
        properties: {
            database_type: {
                description: 'Database',
                type: 'string',
                default: 'mysql',
                required: true,
                message: 'Database',
                conform: function (value) {
                    return value.length > 0
                }
            },
            database_host: {
                description: 'Host',
                type: 'string',
                default: 'localhost',
                required: true,
                message: 'Host',
                conform: function (value) {
                    return value.length > 0
                }
            },
            database_port: {
                description: 'Port',
                type: 'string',
                default: '3306',
                required: true,
                message: 'Port',
                conform: function (value) {
                    return value.length > 0
                }
            },
            username: {
                description: 'Username',
                type: 'string',
                required: true,
                message: 'Username',
                conform: function (value) {
                    return value.length > 0
                }
            },
            password: {
                description: 'Password',
                type: 'string',
                required: true,
                message: 'Password',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.database = inp
}

async function configFrontend() {
    console.log('Config frontend:')
    const inp = await get({
        properties: {
            frontend_type: {
                description: 'Frontend',
                type: 'string',
                default: 'Angular',
                required: true,
                message: 'Frontend',
                conform: function (value) {
                    return value.length > 0
                }
            },
            frontend_host: {
                description: 'Host',
                type: 'string',
                default: 'localhost',
                required: true,
                message: 'Host',
                conform: function (value) {
                    return value.length > 0
                }
            },
            frontend_port: {
                description: 'Port',
                type: 'string',
                default: '80',
                required: true,
                message: 'Port',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.frontend = inp
    switch (inp.frontend_type) {
        case 'Angular':
            config.frontend.type = 'angular'
            break
        case 'React':
            config.frontend.type = 'react'
            break
        case 'Vue':
            config.frontend.type = 'vue'
            break
    }
}

async function configRedis() {
    console.log('Config redis:')
    const inp = await get({
        properties: {
            redis_host: {
                description: 'Host',
                type: 'string',
                default: 'localhost',
                required: true,
                message: 'Host',
                conform: function (value) {
                    return value.length > 0
                }
            },
            redis_port: {
                description: 'Port',
                type: 'string',
                default: '6379',
                required: true,
                message: 'Port',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.redis = inp
}

async function configMail() {
    console.log('Config mail:')
    const inp = await get({
        properties: {
            mail_host: {
                description: 'Host',
                type: 'string',
                default: 'localhost',
                required: true,
                message: 'Host',
                conform: function (value) {
                    return value.length > 0
                }
            },
            mail_port: {
                description: 'Port',
                type: 'string',
                default: '25',
                required: true,
                message: 'Port',
                conform: function (value) {
                    return value.length > 0
                }
            },
            mail_username: {
                description: 'Username',
                type: 'string',
                required: true,
                message: 'Username',
                conform: function (value) {
                    return value.length > 0
                }
            },
            mail_password: {
                description: 'Password',
                type: 'string',
                required: true,
                message: 'Password',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.mail = inp
}

async function configGit() {
    console.log('Allow git? (y/n)')
    const inp = await get({
        properties: {
            git: {
                description: 'Allow git?',
                type: 'string',
                default: 'y',
                required: true,
                message: 'Allow git?',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.git = inp.git === 'y'
}

async function configGhActions() {
    console.log('Allow github actions? (y/n)')
    const inp = await get({
        properties: {
            gh_actions: {
                description: 'Allow github actions?',
                type: 'string',
                default: 'y',
                required: true,
                message: 'Allow github actions?',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.gh_actions = inp.gh_actions === 'y'
}

async function configHeroku() {
    console.log('Allow heroku? (y/n)')
    const inp = await get({
        properties: {
            heroku: {
                description: 'Allow heroku?',
                type: 'string',
                default: 'y',
                required: true,
                message: 'Allow heroku?',
                conform: function (value) {
                    return value.length > 0
                }
            }
        }
    })
    config.heroku = inp.heroku === 'y'
}

async function main() {
    prompt.start()
    await chooseEnvironment()
    await configFrontend()
    await configDatabase()
    await configRedis()
    await configMail()
    await configGit()
    await configGhActions()
    await configHeroku()
    return 0
}

main().then((c) => process.exit(c))
