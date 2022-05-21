import { IAccessLog } from '../types/access-log.interface'
import { workerFactory } from './worker.factory'

export function accessLogFactory(params: Partial<IAccessLog> = {}): IAccessLog {
    return {
        id: params.id || '',
        event: params.event || 'entry',
        action: 'forbid',
        subject: {
            worker: workerFactory(),
        },
        created_at: params.created_at || '',
        updated_at: params.updated_at || '',
    }
}
