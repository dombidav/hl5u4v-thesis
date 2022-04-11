import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkersRoutingModule } from './workers-routing.module'
import { WorkersComponent } from './workers.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleWorkerComponent } from './single-worker/single-worker.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'

@NgModule({
    declarations: [WorkersComponent, SingleWorkerComponent],
    imports: [
        CommonModule,
        WorkersRoutingModule,
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
export class WorkersModule {}
