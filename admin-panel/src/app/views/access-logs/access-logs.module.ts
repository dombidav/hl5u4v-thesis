import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccessLogsRoutingModule } from './access-logs-routing.module'
import { AccessLogsComponent } from './access-logs.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleAccessLogComponent } from './single-access-log/single-access-log.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'

@NgModule({
    declarations: [AccessLogsComponent, SingleAccessLogComponent],
    imports: [
        CommonModule,
        AccessLogsRoutingModule,
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
export class AccessLogsModule {}
