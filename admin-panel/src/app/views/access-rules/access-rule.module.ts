import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccessRuleRoutingModule } from './access-rule-routing.module'
import { AccessRulesComponent } from './access-rules.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleAccessRuleComponent } from './single-access-rule/single-access-rule.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'
import { PickListModule } from 'primeng/picklist'
import { SelectButtonModule } from 'primeng/selectbutton'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { EditorModule } from 'primeng/editor'

@NgModule({
    declarations: [AccessRulesComponent, SingleAccessRuleComponent],
    imports: [
        CommonModule,
        AccessRuleRoutingModule,
        SharedComponentsModule,
        ToolbarModule,
        ButtonModule,
        SharedModule,
        RippleModule,
        TableModule,
        InputTextModule,
        FormsModule,
        CalendarModule,
        PickListModule,
        SelectButtonModule,
        ToggleButtonModule,
        EditorModule,
    ],
})
export class AccessRuleModule {}
