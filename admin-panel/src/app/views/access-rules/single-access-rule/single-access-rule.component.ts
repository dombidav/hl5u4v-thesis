import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { accessRuleFactory } from '../../../../factories/access-rule.factory'
import { AccessRuleService } from '../../../core/services/access-rule.service'
import { IAccessRule } from '../../../../types/access-rule.interface'
import { ITeam } from '../../../../types/team.interface'
import { ILockGroup } from '../../../../types/lock-groups.interface'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-access-rule.component.html',
    styleUrls: ['./single-access-rule.component.scss'],
})
export class SingleAccessRuleComponent extends SingleResourceComponent<IAccessRule> {
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

    async ngOnInit() {
        await this.init()
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
