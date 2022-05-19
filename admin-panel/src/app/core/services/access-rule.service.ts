import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { IAccessRule } from '../../../types/access-rule.interface'

@Injectable({
    providedIn: 'root',
})
export class AccessRuleService extends ResourceService<IAccessRule> {
    constructor() {
        super('access_rule')
    }
}
