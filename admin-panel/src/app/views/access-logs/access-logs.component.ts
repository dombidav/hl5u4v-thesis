import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { IAccessLog } from '../../../types/access-log.interface'
import { AccessLogService } from '../../core/services/access-log.service'

@Component({
    selector: 'app-lock-groups',
    templateUrl: './access-logs.component.html',
    styleUrls: ['./access-logs.component.scss'],
})
export class AccessLogsComponent implements OnInit, ViewDidEnter {
    refreshTable = new BehaviorSubject(null)

    records: IAccessLog[] = []

    columns: {
        title: string | ((res: any) => string)
        field: keyof IAccessLog
        sortable?: boolean
        content?: (res: any) => string
    }[] = [
        {
            title: 'ID',
            field: 'id',
            sortable: true,
        },
        {
            title: 'Event',
            field: 'event',
            sortable: true,
        },
    ]

    constructor(public readonly resourceService: AccessLogService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
