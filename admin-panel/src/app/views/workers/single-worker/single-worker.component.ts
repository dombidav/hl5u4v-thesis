import { Component, OnInit } from '@angular/core'
import { WorkerService } from '../../../core/services/worker.service'
import { ActivatedRoute } from '@angular/router'
import { IWorker } from '../../../../types/worker.interface'
import { workerFactory } from '../../../../factories/worker.factory'
import { NgModel } from '@angular/forms'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-worker.component.html',
    styleUrls: ['./single-worker.component.scss'],
})
export class SingleWorkerComponent implements OnInit {
    public worker?: IWorker

    constructor(private readonly service: WorkerService, private readonly route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            if (!params.id || params.id === 'new') {
                this.worker = workerFactory()
                return
            }
            this.service.read(params.id).subscribe((worker) => (this.worker = worker))
        })
    }

    ngOnInit() {}

    save(ngModels: NgModel[]) {
        if (!this.check(ngModels)) {
            return
        }
    }

    check(ngModels: NgModel[]) {
        return !ngModels.some((ngModel) => ngModel.invalid)
    }

    log(ngModels: NgModel[]) {
        console.log(ngModels)
    }
}
