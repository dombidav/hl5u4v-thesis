import { Component } from '@angular/core'
import { WorkerService } from '../../../core/services/worker.service'
import { IWorker } from '../../../../types/worker.interface'
import { workerFactory } from '../../../../factories/worker.factory'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-worker.component.html',
    styleUrls: ['./single-worker.component.scss'],
})
export class SingleWorkerComponent extends SingleResourceComponent<IWorker> {
    constructor(protected readonly service: WorkerService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = workerFactory

    ngOnInit() {
        this.init()
    }
}
