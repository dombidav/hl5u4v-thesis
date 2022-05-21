import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccessRulesComponent } from './access-rules.component'
import { SingleAccessRuleComponent } from './single-access-rule/single-access-rule.component'

const routes: Routes = [
    {
        path: '',
        component: AccessRulesComponent,
    },
    {
        path: 'new',
        component: SingleAccessRuleComponent,
        data: {
            title: 'Access Rules > New Rule',
        },
    },
    {
        path: ':id',
        component: SingleAccessRuleComponent,
        data: {
            title: 'Access Rules > Single Rule',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccessRuleRoutingModule {}
