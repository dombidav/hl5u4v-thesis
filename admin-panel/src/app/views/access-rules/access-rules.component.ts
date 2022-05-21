import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { ILockGroup } from '../../../types/lock-groups.interface'
import { AccessRuleService } from '../../core/services/access-rule.service'

@Component({
    selector: 'app-lock-groups',
    templateUrl: './access-rules.component.html',
    styleUrls: ['./access-rules.component.scss'],
})
export class AccessRulesComponent implements OnInit, ViewDidEnter {
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

    constructor(public readonly resourceService: AccessRuleService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
