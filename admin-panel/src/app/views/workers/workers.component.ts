import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IWorker } from '../../../types/worker.interface'
import { WorkerService } from '../../core/services/worker.service'

@Component({
    selector: 'app-workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.scss'],
})
export class WorkersComponent implements OnInit {
    refreshTable = new BehaviorSubject(null)

    records: IWorker[] = []

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
            title: 'Birthdate',
            field: 'birthdate',
            sortable: true,
        },
    ]

    constructor(public readonly workersService: WorkerService) {}

    ngOnInit() {}
}
