import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { LockService } from '../../../core/services/lock.service'
import { ILock } from '../../../../types/lock.interface'
import { lockFactory } from '../../../../factories/lock.factory'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-lock.component.html',
    styleUrls: ['./single-lock.component.scss'],
})
export class SingleLockComponent extends SingleResourceComponent<ILock> {
    constructor(protected readonly service: LockService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected resourceFactory = lockFactory

    ngOnInit() {
        this.init()
    }
}
