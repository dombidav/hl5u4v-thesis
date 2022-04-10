import { StorageService } from '../app/core/services/storage.service'
import { STORAGE_KEY } from '../app/core/consts/storage.keys'

export function jwtOptionsFactory(storage: StorageService): any {
    return {
        tokenGetter: () => storage.get(STORAGE_KEY.JWT_TOKEN),
        allowedDomains: ['*'],
    }
}
