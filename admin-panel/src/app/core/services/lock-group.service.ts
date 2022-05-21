import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { ILockGroup } from '../../../types/lock-groups.interface'

@Injectable({
    providedIn: 'root',
})
export class LockGroupService extends ResourceService<ILockGroup> {
    constructor() {
        super('lock_group')
    }
}
