import { IUser } from '../types/user.interface'

export function userFactory(params: Partial<IUser> = {}): IUser {
    return {
        id: params.id || '',
        name: params.name || '',
        email: params.email || '',
        email_verified_at: params.email_verified_at || new Date(),
        created_at: params.created_at || '',
        updated_at: params.updated_at || '',
    }
}
