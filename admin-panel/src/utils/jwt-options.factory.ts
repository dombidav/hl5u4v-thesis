import { StorageService } from '../app/core/services/storage.service'
import { STORAGE_KEY } from '../app/core/consts/storage.keys'
import { IJwtToken } from '../types/jwt-token.interface'

export function jwtOptionsFactory(storage: StorageService): any {
    return {
        tokenGetter: () => storage.get(STORAGE_KEY.JWT_TOKEN),
        allowedDomains: ['*'],
    }
}

export function jwtIsExpired(token: IJwtToken) {
    if (!token?.exp) return true
    return token.exp < Date.now() / 1000
}
