import { Injectable } from '@angular/core'
import { ResourceService } from './resource.service'
import { ITeam } from '../../../types/team.interface'

@Injectable({
    providedIn: 'root',
})
export class TeamService extends ResourceService<ITeam> {
    constructor() {
        super('team')
    }
}
