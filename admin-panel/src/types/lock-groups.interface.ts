import { IResource } from './resource.interface'
import { ILock } from './lock.interface'

export type LockWithPivot = ILock & { pivot: { lock_group_id: string | number; lock_id: string | number } }

export interface ILockGroup extends IResource {
    name: string
    locks?: LockWithPivot[]
}
