export interface IDatabaseConfig {
    driver: 'mysql' | 'pgsql' | 'sqlite' | 'mongodb'
    host: string
    port: number
    username: string
    password: string
    database: string
}

export interface IFrontendConfig { frontend: 'angular' | 'react' | 'vue' | 'svelte', host: string }

export interface IRedisConfig { host: string, port: number, password: string }

export interface IMailerConfig { host: string, port: number, username: string, password: string, from: string }

export interface IGitConfig {
    type: 'github' | 'gitlab' | 'bitbucket' | 'custom'
    ghRepo?: boolean
    ghRepoName?: string
    ghRepoVisibility?: 'public' | 'private'
}

export interface IAppConfig { name: string }

export interface IBackendConfig { host: string }

export interface IHerokuConfig {
    appName?: string
    region?: string
    databaseAddon?: 'heroku-postgresql:hobby-dev' | 'heroku-redis:hobby-dev' | 'ah-mysql-stackhero:ist-kqor2t'
}

export interface IConfig {
    app: IAppConfig
    services: string[]
    environment: 'local' | 'production'
    docker: 'sail' | 'native'
    backend: IBackendConfig
    database: IDatabaseConfig
    frontend?: IFrontendConfig
    redis?: IRedisConfig
    mailer?: IMailerConfig
    git?: IGitConfig
    heroku?: IHerokuConfig
}

export function configFactory(): IConfig {
    return {
        app: { name: 'acs' },
        environment: 'local',
        docker: 'native',
        services: [],
        backend: { host: 'http://localhost:8080' },
        frontend: { frontend: 'angular', host: 'http://localhost:3000' },
        database: { driver: 'mysql', host: 'localhost', port: 3306, username: 'root', password: '', database: 'acs' },
    }
}
