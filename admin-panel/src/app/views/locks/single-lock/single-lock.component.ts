import { Component } from '@angular/core'
import { WorkerService } from '../../../core/services/worker.service'
import { IWorker } from '../../../../types/worker.interface'
import { workerFactory } from '../../../../factories/worker.factory'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-lock.component.html',
    styleUrls: ['./single-lock.component.scss'],
})
export class SingleLockComponent extends SingleResourceComponent<IWorker> {
    constructor(protected readonly service: WorkerService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = workerFactory

    ngOnInit() {
        this.init()
    }
}
