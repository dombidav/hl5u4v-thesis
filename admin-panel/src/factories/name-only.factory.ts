import { IResource } from '../types/resource.interface'

export function nameOnlyFactory<T extends IResource & { name: string }>(properties: Partial<T> = {}) {
    return {
        id: properties.id || 'N/A',
        name: properties.name || '',
        created_at: properties.created_at || '',
        updated_at: properties.updated_at || '',
    }
}
