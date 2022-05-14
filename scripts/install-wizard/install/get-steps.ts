import {IConfig} from '../config.interface'
import {promises} from 'fs'
import {writeEnv} from './write-env'
import {cmdlet} from '../../utils/cmdlet.tools'
import {join} from 'path'
import {retrieveHerokuConfig} from "./retrieve-heroku-config";
import {debug} from "../../utils/log.tools";

const VARIABLE_REGEX = /@@([a-zA-Z0-9_.-]+)(?: \?\? )?(.+)?@@/gmi

function commit(commitMessage: string) {
    return {
        name: 'Commit changes',
        action: async () => cmdlet(`git add . && git commit -m "${commitMessage}"`)
    }
}

export function getSteps(config: IConfig) {
    const steps: { name: string, action: () => Promise<any> }[] = [
        {
            name: 'Write wizard config',
            action: () => promises.writeFile('config.cli.json', JSON.stringify(config, null, 2))
        },
        {
            name: 'Write .env file',
            action: () => writeEnv(config, VARIABLE_REGEX)
        },
        {
            name: 'Copy .env to backend and frontend',
            action: () => cmdlet('yarn run env:generate')
        },
        {
            name: 'Install packages in frontend with yarn',
            action: () => cmdlet('yarn install', {cwd: join(process.cwd(), 'admin-panel')})
        },
        {
            name: 'Install packages in backend with Composer',
            action: () => cmdlet('composer install', {cwd: join(process.cwd(), 'webservice')})
        },
        {
            name: 'Set APP_KEY',
            action: () => cmdlet('yarn run set:key')
        },
        {
            name: 'Set JWT_SECRET',
            action: async () => {
                return cmdlet('php artisan jwt:secret', {cwd: join(process.cwd(), 'webservice')}).then((output) => process.env.JWT_SECRET = output.stdout.match(/\[(.+)]/)?.[1])
            }
        },
        {
            name: 'Migrate database tables',
            action: () => cmdlet('php artisan migrate:fresh', {cwd: join(process.cwd(), 'webservice')})
        },
    ]

    if(config.environment === 'local') {
        steps.push({
            name: 'Seed database',
            action: () => cmdlet('php artisan db:seed', {cwd: join(process.cwd(), 'webservice')})

        })
    }
    if (config.services.includes('git')) {
        steps.push({
            name: 'Reinitialize git repository',
            action: async () => {
                await promises.rmdir('.git', {recursive: true})
                return cmdlet('git init')
            }
        })
        steps.push(commit('Initial commit'))
    }

    if(config.git?.ghRepoName) {
        steps.push({
            name: 'Create GitHub repository',
            action: () => cmdlet(`gh repo create ${config.git?.ghRepoName} --source=. --push --${config.git?.ghRepoVisibility}`)
        })
    }

    if (config.services.includes('heroku')) {
        steps.push({
            name: 'Create Heroku app',
            action: async () => cmdlet(`heroku create ${config.heroku?.appName} --region ${config.heroku?.region} --buildpack heroku/nodejs`)
        })
        steps.push({
            name: 'Add heroku/php buildpack',
            action: async () => cmdlet(`heroku buildpacks:add heroku/php -a ${config.heroku?.appName}`)
        })
        if(config.redis?.host) {
            steps.push({
                name: 'Add heroku/redis addon',
                action: async () => cmdlet(`heroku addons:create heroku-redis:hobby-dev -a ${config.heroku?.appName}`)
            })
        }
        steps.push({
            name: `Add ${config.heroku?.databaseAddon ?? ''} addon`,
            action: async () => cmdlet(`heroku addons:create ${config.heroku?.databaseAddon ?? ''} -a ${config.heroku?.appName}`)
        })
        steps.push({
            name: 'Add heroku remote',
            action: async () => cmdlet(`heroku git:remote -a ${config.heroku?.appName}`)
        })
        steps.push({
            name: 'Deploy to Heroku',
            action: async () => {
                try {
                    return cmdlet(`git push heroku main`);
                } catch (__: unknown) {
                    return cmdlet(`git push heroku master`);
                }
            }
        })
        steps.push({
            name: 'Set up Heroku environment variables',
            action: async () => {
                const skipPattern = /APP_ENV|APP_URL|DB_.+|REDIS_.+|MAIL_.+/gi
                const env = (await promises.readFile('.env')).toString()
                for (const line of env.split('\n')) {
                    debug('HerokuSteps::SetupEnvs', 'Line:', line)
                    if (line.startsWith('#')) {
                        debug('HerokuSteps::SetupEnvs','skipping comment')
                        continue
                    }
                    if (line.length === 0) {
                        debug('HerokuSteps::SetupEnvs','skipping empty line')
                        continue
                    }
                    const [key, value] = line.split('=').map(s => s.trim().replace(/^"|"$/g, ''))
                    if (!key || !value) {
                        debug('HerokuSteps::SetupEnvs','skipping invalid line')
                        continue
                    }
                    if (skipPattern.test(key)) {
                        debug('HerokuSteps::SetupEnvs','skipping excluded key')
                        continue
                    }
                    debug('HerokuSteps::SetupEnvs','Setting env var:', key, value)
                    cmdlet(`heroku config:set ${key}=${value} -a ${config.heroku?.appName}`)
                         .then(() => console.log(`Set ${key}=${value}`))
                }

                cmdlet(`heroku config:set JWT_SECRET=${process.env.JWT_SEECRET} -a ${config.heroku?.appName}`).then()

                if(config.heroku?.databaseAddon?.includes('cleardb')) {
                    const conf = await retrieveHerokuConfig(config.heroku?.appName ?? '')
                    console.log(`Cleardb config:`, conf)
                    console.log(`Cleardb config:`, JSON.stringify(conf, null, 2))
                    debug('HerokuSteps::SetupEnvs','Setting DATABASE_URL=', conf.CLEARDB_DATABASE_URL)
                    await cmdlet(`heroku config:set DATABASE_URL=${(conf.CLEARDB_DATABASE_URL)} -a ${config.heroku?.appName}`)
                }
            }
        })
    }


    return steps
}
