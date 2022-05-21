import { IAccessRule } from '../types/access-rule.interface'
import { Date2 } from '../utils/date2.class'

export function accessRuleFactory(properties: Partial<IAccessRule> = {}): IAccessRule {
    return {
        id: properties.id || 'N/A',
        name: properties.name || '',
        description: properties.description || '',
        definition: {
            from: new Date2().toMysqlDate(),
            until: new Date2().toMysqlDate(),
            onDays: [],
            action: 'forbid',
        },
        created_at: properties.created_at || '',
        updated_at: properties.updated_at || '',
    }
}
