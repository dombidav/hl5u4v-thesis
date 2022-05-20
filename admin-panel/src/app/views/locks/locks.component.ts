import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { ILock } from '../../../types/lock.interface'
import { LockService } from '../../core/services/lock.service'

@Component({
    selector: 'app-locks',
    templateUrl: './locks.component.html',
    styleUrls: ['./locks.component.scss'],
})
export class LocksComponent implements OnInit, ViewDidEnter {
    refreshTable = new BehaviorSubject(null)

    records: ILock[] = []

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

    constructor(public readonly resourceService: LockService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
