import { IResource } from './resource.interface'

export interface ILock extends IResource {
    name: string
    device_key: string | null
    status: 0 | 1 | 2 | 3
}
