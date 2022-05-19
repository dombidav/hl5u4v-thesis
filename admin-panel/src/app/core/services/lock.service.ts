import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { ILock } from '../../../types/lock.interface'

@Injectable({
    providedIn: 'root',
})
export class LockService extends ResourceService<ILock> {
    constructor() {
        super('lock')
    }
}
