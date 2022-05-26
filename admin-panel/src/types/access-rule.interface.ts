import { IResource } from './resource.interface'
import { ILockGroup } from './lock-groups.interface'
import { ITeam } from './team.interface'

export interface IAccessRuleDefinition {
    from: string
    until: string
    action: 'allow' | 'forbid'
}

export interface IGenericAccessRuleDefinition extends IAccessRuleDefinition {
    onDays: (0 | 1 | 2 | 3 | 4 | 5 | 6)[]
}

export interface ISpecificAccessRuleDefinition extends IAccessRuleDefinition {
    on: Date
}

export interface IAccessRule extends IResource {
    name: string
    description?: string
    definition: ISpecificAccessRuleDefinition | IGenericAccessRuleDefinition
    lock_groups?: ILockGroup[]
    worker_groups?: ITeam[]
}

// {"onDays":[0,1,2,4,5,6],"from":"03:06:26.000","until":"08:53:23.000","action":"forbid"}
