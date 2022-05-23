import { IResource } from './resource.interface'

export interface IUser extends IResource {
    name: string
    email: string
    email_verified_at: Date
}
