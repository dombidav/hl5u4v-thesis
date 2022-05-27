export interface IInternalAccessRuleDefinition {
    from: Date
    to: Date
    onDays: { thu: boolean; tue: boolean; wed: boolean; sat: boolean; fri: boolean; mon: boolean; sun: boolean }
    on: Date
    allow: boolean
}
