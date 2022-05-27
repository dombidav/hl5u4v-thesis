import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { accessRuleFactory } from '../../../../factories/access-rule.factory'
import { AccessRuleService } from '../../../core/services/access-rule.service'
import { IAccessRule, IGenericAccessRuleDefinition } from '../../../../types/access-rule.interface'
import { ITeam } from '../../../../types/team.interface'
import { ILockGroup } from '../../../../types/lock-groups.interface'
import { IInternalAccessRuleDefinition } from '../../../../types/internal-access-rule-definition.interface'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-access-rule.component.html',
    styleUrls: ['./single-access-rule.component.scss'],
})
export class SingleAccessRuleComponent extends SingleResourceComponent<IAccessRule> {
    ruleTypes = [
        { label: 'Generic', value: true },
        { label: 'Specific', value: false },
    ]

    genericRule = true

    lists = {
        attachedTeams: [],
        notAttachedTeams: [],
        attachedLockGroups: [],
        notAttachedLockGroups: [],
    }

    constructor(protected readonly service: AccessRuleService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = accessRuleFactory

    definition: IInternalAccessRuleDefinition = {
        on: new Date(),
        from: new Date(new Date().setHours(0, 0, 0, 0)),
        to: new Date(new Date().setHours(23, 59, 59, 999)),
        onDays: {
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
        },
        allow: true,
    }

    time(date: Date) {
        return date.toLocaleTimeString('hu-HU', { hour: '2-digit', hour12: false, minute: '2-digit' })
    }

    beforeSave(isNew: boolean, resource: IAccessRule) {
        if (this.genericRule) {
            const onDays = []
            if (this.definition.onDays.mon) onDays.push(0)
            if (this.definition.onDays.tue) onDays.push(1)
            if (this.definition.onDays.wed) onDays.push(2)
            if (this.definition.onDays.thu) onDays.push(3)
            if (this.definition.onDays.fri) onDays.push(4)
            if (this.definition.onDays.sat) onDays.push(5)
            if (this.definition.onDays.sun) onDays.push(6)

            resource.definition = {
                onDays,
                from: this.time(this.definition.from),
                until: this.time(this.definition.to),
                action: this.definition.allow ? 'allow' : 'forbid',
            }
            return
        }

        resource.definition = {
            on: this.definition.on,
            from: this.time(this.definition.from),
            until: this.time(this.definition.to),
            action: this.definition.allow ? 'allow' : 'forbid',
        }
    }

    incl(day: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
        return (this.resource.definition as IGenericAccessRuleDefinition).onDays.includes(day)
    }

    async ngOnInit() {
        await this.init()
        if ((this.resource.definition as any).onDays?.length) {
            this.genericRule = true
            this.definition.onDays = {
                mon: this.incl(0),
                tue: this.incl(1),
                wed: this.incl(2),
                thu: this.incl(3),
                fri: this.incl(4),
                sat: this.incl(5),
                sun: this.incl(6),
            }
        }
        this.service.getAttachedList(this.resource.id).subscribe((res) => {
            this.lists.attachedTeams = res.attached_teams
            this.lists.notAttachedTeams = res.not_attached_teams
            this.lists.attachedLockGroups = res.attached_lock_groups
            this.lists.notAttachedLockGroups = res.not_attached_lock_groups
        })
    }

    attachTeam(team: ITeam[]) {
        this.service.attachTeam(this.resource.id, ...team).subscribe(() => {})
    }

    detachTeam(team: ITeam[]) {
        this.service.detachTeam(this.resource.id, ...team).subscribe(() => {})
    }

    attachLockGroup(lockGroup: ILockGroup[]) {
        this.service.attachLockGroup(this.resource.id, ...lockGroup).subscribe(() => {})
    }

    detachLockGroup(lockGroup: ILockGroup[]) {
        this.service.detachLockGroup(this.resource.id, ...lockGroup).subscribe(() => {})
    }
}
