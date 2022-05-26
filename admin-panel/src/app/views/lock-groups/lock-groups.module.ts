import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LockGroupRoutingModule } from './lock-group-routing.module'
import { LockGroupsComponent } from './lock-groups.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleLockGroupComponent } from './single-lock-group/single-lock-group.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'
import { PickListModule } from 'primeng/picklist'

@NgModule({
    declarations: [LockGroupsComponent, SingleLockGroupComponent],
    imports: [
        CommonModule,
        LockGroupRoutingModule,
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
    ],
})
export class LockGroupsModule {}
