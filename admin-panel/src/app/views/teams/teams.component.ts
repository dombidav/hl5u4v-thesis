import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { ITeam } from '../../../types/team.interface'
import { TeamService } from '../../core/services/team.service'

@Component({
    selector: 'app-workers',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, ViewDidEnter {
    refreshTable = new BehaviorSubject(null)

    records: ITeam[] = []

    columns: {
        title: string | ((res: any) => string)
        field: any
        sortable?: boolean
        content?: (res: any) => string
    }[] = [
        {
            title: 'ID',
            field: 'id',
            sortable: true,
        },
        {
            title: 'Name',
            field: 'name',
            sortable: true,
        },
    ]

    constructor(public readonly resourceService: TeamService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
