import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { ILockGroup } from '../../../types/lock-groups.interface'
import { LockGroupService } from '../../core/services/lock-group.service'

@Component({
    selector: 'app-lock-groups',
    templateUrl: './lock-groups.component.html',
    styleUrls: ['./lock-groups.component.scss'],
})
export class LockGroupsComponent implements OnInit, ViewDidEnter {
    refreshTable = new BehaviorSubject(null)

    records: ILockGroup[] = []

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

    constructor(public readonly resourceService: LockGroupService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
