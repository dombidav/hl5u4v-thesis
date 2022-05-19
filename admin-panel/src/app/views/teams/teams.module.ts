import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TeamsRoutingModule } from './teams-routing.module'
import { TeamsComponent } from './teams.component'
import { SharedComponentsModule } from '../../shared-components/shared-components.module'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { SharedModule } from 'primeng/api'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { SingleTeamComponent } from './single-team/single-team.component'
import { FormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'

@NgModule({
    declarations: [TeamsComponent, SingleTeamComponent],
    imports: [
        CommonModule,
        TeamsRoutingModule,
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
export class TeamsModule {}
