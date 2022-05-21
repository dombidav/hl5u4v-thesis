import { Component } from '@angular/core'
import { SingleResourceComponent } from '../../../../utils/single-resource.component'
import { ActivatedRoute } from '@angular/router'
import { accessRuleFactory } from '../../../../factories/access-rule.factory'
import { AccessRuleService } from '../../../core/services/access-rule.service'
import { IAccessRule } from '../../../../types/access-rule.interface'

@Component({
    selector: 'app-single-worker',
    templateUrl: './single-access-rule.component.html',
    styleUrls: ['./single-access-rule.component.scss'],
})
export class SingleAccessRuleComponent extends SingleResourceComponent<IAccessRule> {
    constructor(protected readonly service: AccessRuleService, protected readonly route: ActivatedRoute) {
        super()
    }

    protected readonly resourceFactory = accessRuleFactory

    ngOnInit() {
        this.init()
    }
}
