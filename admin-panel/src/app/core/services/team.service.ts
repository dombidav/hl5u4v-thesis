import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { IWorker } from '../../../types/worker.interface'

@Injectable({
    providedIn: 'root',
})
export class TeamService extends ResourceService<IWorker> {
    constructor() {
        super('worker')
    }
}
