import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { AccessLogService } from '../../../core/services/access-log.service'
import { IAccessLog } from '../../../../types/access-log.interface'
import { accessLogFactory } from '../../../../factories/access-log.factory'

@Component({
    selector: 'app-single-log',
    templateUrl: './single-access-log.component.html',
    styleUrls: ['./single-access-log.component.scss'],
})
export class SingleAccessLogComponent extends SingleResourceComponent<IAccessLog> {
    constructor(protected readonly service: AccessLogService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = accessLogFactory

    ngOnInit() {
        this.init()
    }
}
