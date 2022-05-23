import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { IUser } from '../../../types/user.interface'

@Injectable({
    providedIn: 'root',
})
export class UserService extends ResourceService<IUser> {
    constructor() {
        super('user')
    }
}
