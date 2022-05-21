import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { LockGroupService } from '../../../core/services/lock-group.service'
import { nameOnlyFactory } from '../../../../factories/name-only.factory'
import { ILockGroup } from '../../../../types/lock-groups.interface'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-lock-group.component.html',
    styleUrls: ['./single-lock-group.component.scss'],
})
export class SingleLockGroupComponent extends SingleResourceComponent<ILockGroup> {
    constructor(protected readonly service: LockGroupService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = nameOnlyFactory

    ngOnInit() {
        this.init()
    }
}
