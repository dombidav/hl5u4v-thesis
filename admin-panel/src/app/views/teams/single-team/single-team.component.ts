import { Component } from '@angular/core'
import { ITeam } from '../../../../types/team.interface'
import { TeamService } from '../../../core/services/team.service'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { nameOnlyFactory } from '../../../../factories/name-only.factory'
import { IWorker } from '../../../../types/worker.interface'
import { sub } from '../../../../utils/array.tools'

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

    originalNotAttachedList: IWorker[] = []

    notAttachedList: IWorker[] = []

    originalAttachedList: IWorker[] = []

    attachedList: IWorker[] = []

    afterSave(__: boolean, ___: ITeam) {
        this.service
            .detach(this.resource.id, ...sub(this.notAttachedList, this.originalNotAttachedList))
            .subscribe(() => console.log('detached'))
        this.service
            .attach(this.resource.id, ...sub(this.attachedList, this.originalAttachedList))
            .subscribe(() => console.log('attached'))
    }

    async ngOnInit() {
        await this.init()
        this.service.getAttachedList(this.resource.id).subscribe((res) => {
            this.notAttachedList = res.not_attached
            this.originalNotAttachedList = [...this.notAttachedList]
            this.attachedList = res.attached
            this.originalAttachedList = [...this.attachedList]
        })
    }
}
