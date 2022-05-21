import { ILock } from '../types/lock.interface'

export function lockFactory(properties: Partial<ILock> = {}): ILock {
    return {
        id: properties.id || 'N/A',
        name: properties.name || '',
        device_key: properties.device_key || '',
        status: properties.status || 0,
        created_at: properties.created_at || '',
        updated_at: properties.updated_at || '',
    }
}
