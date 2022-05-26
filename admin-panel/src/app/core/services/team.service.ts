import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { ITeam, WorkerWithPivot } from '../../../types/team.interface'
import { IWorker } from '../../../types/worker.interface'
import { api } from '../../../utils/url.tools'
import { first, forkJoin, map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TeamService extends ResourceService<ITeam> {
    protected override readonly queryParams = {
        'not-attached': '1',
    }

    constructor() {
        super('team')
    }

    getAttachedList(id: string | number): Observable<{ not_attached: IWorker[]; attached: WorkerWithPivot[] }> {
        return this.http
            .get<{ data: ITeam; not_attached: IWorker[] }>(api([this.path, id.toString()], this.queryParams))
            .pipe(map((res) => ({ attached: res.data.workers, not_attached: res.not_attached })))
            .pipe(first())
    }

    attach(team_id: string | number, ...workers: IWorker[]) {
        const rqs: Observable<never>[] = []
        console.log('attach', workers)
        for (const worker of workers) {
            rqs.push(
                this.http.post<never>(api(['team-control'], this.queryParams), {
                    team_id: team_id,
                    worker_id: worker.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }

    detach(team_id: string | number, ...workers: IWorker[]) {
        const rqs: Observable<never>[] = []
        for (const worker of workers) {
            rqs.push(
                this.http.post<never>(api(['team-control', 'detach'], this.queryParams), {
                    team_id: team_id,
                    worker_id: worker.id,
                }),
            )
        }
        if (rqs.length === 0) return new Observable((s) => s.complete())
        return forkJoin(rqs).pipe(first())
    }
}
