import { Component } from '@angular/core'
import { ITeam } from '../../../../types/team.interface'
import { TeamService } from '../../../core/services/team.service'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { nameOnlyFactory } from '../../../../factories/name-only.factory'

@Component({
    selector: 'app-single-team',
    templateUrl: './single-team.component.html',
    styleUrls: ['./single-team.component.scss'],
})
export class SingleTeamComponent extends SingleResourceComponent<ITeam> {
    constructor(protected readonly service: TeamService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected resourceFactory = nameOnlyFactory

    ngOnInit() {
        this.init()
    }
}
