import {IConfig} from "../config.interface";
import {mkdirSync, promises} from "fs";
import {writeEnv} from "./write-env";
import {cmdlet} from "../../utils/cmdlet.tools";
import { join } from "path";
import {getEnv} from "../../utils/object.tools";

const VARIABLE_REGEX = /@@([a-zA-Z0-9_.-]+)(?: \?\? )?(.+)?@@/gmi

function commit(commitMessage: string) {
    return {
        name: 'Commit changes',
        action: async () => cmdlet(`git add . && git commit -m "${commitMessage}"`)
    };
}

export function getSteps(config: IConfig) {
    const steps: { name: string, action: () => Promise<void> }[] = [
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
            action: () => cmdlet('php artisan jwt:secret', {cwd: join(process.cwd(), 'webservice')})
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

    if (config.services.includes('gh-actions')) {
        steps.push({
            name: 'Add GitHub Actions config',
            action: async () => {
                mkdirSync(join('.github', 'workflows'), {recursive: true})
                return await promises.writeFile(
                    join('.github', 'workflows', 'laravel.yml'),
                    await promises.readFile(
                        './scripts/install-wizard/install/gh-config.cli-template'
                    )
                )
            }
        })
        steps.push(commit('Added GitHub Actions config'))
    }

    if (config.services.includes('heroku')) {
        steps.push({
            name: 'Create Heroku app',
            action: async () => cmdlet(`heroku create ${config.heroku?.appName} --region ${config.heroku?.region} --buildpack heroku/nodejs`)
        })
        steps.push({
            name: 'Add heroku/php buildpack',
            action: async () => cmdlet(`heroku buildpacks:add heroku/php`)
        })
        if(config.redis?.host) {
            steps.push({
                name: 'Add heroku/redis addon',
                action: async () => cmdlet(`heroku addons:create redis:hobby-dev`)
            })
        }
        steps.push({
            name: `Add ${config.heroku?.databaseAddon ?? ''} addon`,
            action: async () => cmdlet(`heroku addons:create ${config.heroku?.databaseAddon ?? ''}`)
        })
        steps.push({
            name: 'Add heroku remote',
            action: async () => cmdlet(`heroku git:remote -a ${config.heroku?.appName}`)
        })
        steps.push({
            name: 'Deploy to Heroku',
            action: async () => cmdlet(`git push heroku master`)
        })
    }


    return steps
}
