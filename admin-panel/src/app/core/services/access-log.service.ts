import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { IAccessLog } from '../../../types/access-log.interface'

@Injectable({
    providedIn: 'root',
})
export class AccessLogService extends ResourceService<IAccessLog> {
    constructor() {
        super('access_log')
    }
}
