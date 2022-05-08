import {IConfig} from "../install-wizard/config.interface";

export function resolve<TRes, TObj extends Record<string, any> = Record<string, any>>(obj: TObj, path: string|string[], separator='.'): TRes {
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj) as TRes
}

export function getEnv<T>(key: string, config: IConfig) : T|undefined {
    return process.env[key] as any
}
