import { Component } from '@angular/core'
import { ITeam } from '../../../../types/team.interface'
import { TeamService } from '../../../core/services/team.service'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { teamFactory } from '../../../../factories/team.factory'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-single-team',
    templateUrl: './single-team.component.html',
    styleUrls: ['./single-team.component.scss'],
})
export class SingleTeamComponent extends SingleResourceComponent<ITeam> {
    constructor(protected readonly service: TeamService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected resourceFactory = teamFactory

    ngOnInit() {
        this.init()
    }
}
