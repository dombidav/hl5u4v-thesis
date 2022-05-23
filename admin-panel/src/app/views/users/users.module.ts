import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UsersRoutingModule } from './users-routing.module'
import { UsersComponent } from './users.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleUserComponent } from './single-user/single-user.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'

@NgModule({
    declarations: [UsersComponent, SingleUserComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedComponentsModule,
        ToolbarModule,
        ButtonModule,
        SharedModule,
        RippleModule,
        TableModule,
        InputTextModule,
        FormsModule,
        CalendarModule,
    ],
})
export class UsersModule {}
