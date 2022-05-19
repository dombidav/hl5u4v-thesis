import { IResource } from './resource.interface'
import { IWorker } from './worker.interface'
import { ILock } from './lock.interface'
import { IAccessRule } from './access-rule.interface'
import { IUser } from './user.interface'

interface IEntryLog {
    worker: IWorker
    lock?: ILock
    Rule?: IAccessRule
}

interface IAdminLog {
    user: IUser
}

export interface IAccessLog extends IResource {
    event: 'entry' | 'login' | 'create' | 'update' | 'delete'
    action: 'allow' | 'forbid'
    subject: IEntryLog | IAdminLog
}
