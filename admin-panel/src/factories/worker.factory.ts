import { IWorker } from '../types/worker.interface'

export function workerFactory(properties: Partial<IWorker> = {}): IWorker {
    return {
        id: properties.id || 'N/A',
        name: properties.name || '',
        rfid: properties.rfid || '',
        birthdate: properties.birthdate || '',
        telephone: properties.telephone || '',
        created_at: properties.created_at || '',
        updated_at: properties.updated_at || '',
    }
}
