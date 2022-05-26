import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { ILockGroup, LockWithPivot } from '../../../types/lock-groups.interface'
import { first, forkJoin, map, Observable } from 'rxjs'
import { api } from '../../../utils/url.tools'
import { ILock } from '../../../types/lock.interface'

@Injectable({
    providedIn: 'root',
})
export class LockGroupService extends ResourceService<ILockGroup> {
    protected override readonly queryParams = {
        'not-attached': '1',
    }

    constructor() {
        super('lock_group')
    }

    getAttachedList(id: string | number): Observable<{ not_attached: ILock[]; attached: LockWithPivot[] }> {
        return this.http
            .get<{ data: ILockGroup; not_attached: ILock[] }>(api([this.path, id.toString()], this.queryParams))
            .pipe(map((res) => ({ attached: res.data.locks, not_attached: res.not_attached })))
            .pipe(first())
    }

    attach(lock_group_id: string | number, ...locks: ILock[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', locks)
        for (const lock of locks) {
            rqs.push(
                this.http.post<never>(api(['lock-control'], this.queryParams), {
                    lock_group_id: lock_group_id,
                    lock_id: lock.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }

    detach(lock_group_id: string | number, ...locks: ILock[]) {
        const rqs: Observable<never>[] = []
        for (const lock of locks) {
            rqs.push(
                this.http.post<never>(api(['lock-control', 'detach'], this.queryParams), {
                    lock_group_id: lock_group_id,
                    lock_id: lock.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }
}
