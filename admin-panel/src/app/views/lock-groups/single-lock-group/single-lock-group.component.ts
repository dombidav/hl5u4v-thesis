import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { LockGroupService } from '../../../core/services/lock-group.service'
import { nameOnlyFactory } from '../../../../factories/name-only.factory'
import { ILockGroup } from '../../../../types/lock-groups.interface'
import { sub } from '../../../../utils/array.tools'
import { ILock } from '../../../../types/lock.interface'

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

    originalNotAttachedList: ILock[] = []

    notAttachedList: ILock[] = []

    originalAttachedList: ILock[] = []

    attachedList: ILock[] = []

    afterSave(__: boolean, ___: ILockGroup) {
        this.service
            .detach(this.resource.id, ...sub(this.notAttachedList, this.originalNotAttachedList))
            .subscribe(() => console.log('detached'))
        this.service
            .attach(this.resource.id, ...sub(this.attachedList, this.originalAttachedList))
            .subscribe(() => console.log('attached'))
    }

    async ngOnInit() {
        await this.init()
        this.service.getAttachedList(this.resource.id).subscribe((res) => {
            this.notAttachedList = res.not_attached
            this.originalNotAttachedList = [...this.notAttachedList]
            this.attachedList = res.attached
            this.originalAttachedList = [...this.attachedList]
        })
    }
}
