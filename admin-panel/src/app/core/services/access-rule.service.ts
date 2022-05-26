import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { IAccessRule } from '../../../types/access-rule.interface'
import { first, forkJoin, map, Observable } from 'rxjs'
import { ITeam } from '../../../types/team.interface'
import { api } from '../../../utils/url.tools'
import { ILockGroup } from '../../../types/lock-groups.interface'

@Injectable({
    providedIn: 'root',
})
export class AccessRuleService extends ResourceService<IAccessRule> {
    protected override readonly queryParams = {
        'not-attached': '1',
    }

    constructor() {
        super('access_rule')
    }

    getAttachedList(id: string | number): Observable<{
        not_attached_teams: ITeam[]
        attached_teams: ITeam[]
        not_attached_lock_groups: ILockGroup[]
        attached_lock_groups: ILockGroup[]
    }> {
        return this.http
            .get<{
                data: IAccessRule
                not_attached_lock_groups: ILockGroup[]
                not_attached_worker_groups: ITeam[]
            }>(api([this.path, id.toString()], this.queryParams))
            .pipe(
                map((res) => ({
                    attached_teams: res.data.worker_groups,
                    not_attached_teams: res.not_attached_worker_groups,
                    attached_lock_groups: res.data.lock_groups,
                    not_attached_lock_groups: res.not_attached_lock_groups,
                })),
            )
            .pipe(first())
    }

    attachTeam(access_rule_id: string | number, ...teams: ITeam[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', teams)
        for (const team of teams) {
            rqs.push(
                this.http.post<never>(api(['rule-control'], this.queryParams), {
                    access_rule_id: access_rule_id,
                    team_id: team.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }

    attachLockGroup(access_rule_id: string | number, ...groups: ILockGroup[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', groups)
        for (const group of groups) {
            rqs.push(
                this.http.post<never>(api(['rule-control'], this.queryParams), {
                    access_rule_id: access_rule_id,
                    lock_group_id: group.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }

    detachTeam(access_rule_id: string | number, ...teams: ITeam[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', teams)
        for (const team of teams) {
            rqs.push(
                this.http.post<never>(api(['rule-control', 'detach'], this.queryParams), {
                    access_rule_id: access_rule_id,
                    team_id: team.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }

    detachLockGroup(access_rule_id: string | number, ...groups: ILockGroup[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', groups)
        for (const group of groups) {
            rqs.push(
                this.http.post<never>(api(['rule-control', 'detach'], this.queryParams), {
                    access_rule_id: access_rule_id,
                    lock_group_id: group.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }
}
