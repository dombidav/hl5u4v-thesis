import {Component, OnInit} from '@angular/core'
import {WorkerService} from '../../../core/services/worker.service'
import {ActivatedRoute} from '@angular/router'
import {IWorker} from '../../../../types/worker.interface'
import {workerFactory} from '../../../../factories/worker.factory'
import {NgModel} from '@angular/forms'
import {RedirectService} from "../../../core/services/redirect.service";

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-worker.component.html',
    styleUrls: ['./single-worker.component.scss'],
})
export class SingleWorkerComponent implements OnInit {
    public resource?: IWorker

    public models: NgModel[] = []

    public invalid = false

    private interval: number | null = null

    constructor(private readonly service: WorkerService, private readonly redirect: RedirectService, private readonly route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            if (!params.id || params.id === 'new') {
                this.resource = workerFactory()
                return
            }
            this.service.read(params.id).subscribe((worker) => (this.resource = worker))
        })
    }

    ngOnInit() {}

    save() {
        if (this.check()) return
        if (this.resource.id && this.resource.id !== 'N/A') {
            console.log('update', this.resource)
            this.service.edit(this.resource).subscribe(() => this.redirect.back())
            return
        }

        this.service.add(this.resource).subscribe(() => this.redirect.back())
    }

    check() {
        return this.models.some((ngModel) => ngModel.invalid)
    }

    log(message: any) {
        console.log(message)
        return true
    }

    setCheckInterval(ngModels: NgModel[]) {
        if (this.interval)
            return true

        this.models = ngModels
        this.interval = setInterval(() => this.invalid = this.check(), 500)

        return true
    }
}
