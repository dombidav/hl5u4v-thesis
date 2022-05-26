import { IResource } from './resource.interface'
import { IWorker } from './worker.interface'

export type WorkerWithPivot = IWorker & { pivot: { team_id: string | number; worker_id: string | number } }

export interface ITeam extends IResource {
    name: string
    workers?: WorkerWithPivot[]
}
