import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../../core/services/user.service'
import { IUser } from '../../../../types/user.interface'
import { userFactory } from '../../../../factories/user.factory'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-user.component.html',
    styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent extends SingleResourceComponent<IUser> {
    constructor(protected readonly service: UserService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = userFactory

    ngOnInit() {
        this.init()
    }
}
