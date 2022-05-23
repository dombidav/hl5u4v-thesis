import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewDidEnter } from '@ionic/angular'
import { IUser } from '../../../types/user.interface'
import { UserService } from '../../core/services/user.service'

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, ViewDidEnter {
    refreshTable = new BehaviorSubject(null)

    records: IUser[] = []

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
        {
            title: 'Email',
            field: 'email',
            sortable: true,
        },
    ]

    constructor(public readonly resourceService: UserService) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.refreshTable.next(null)
    }
}
