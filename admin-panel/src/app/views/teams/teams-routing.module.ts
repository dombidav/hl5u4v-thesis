import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TeamsComponent } from './teams.component'
import { SingleTeamComponent } from './single-team/single-team.component'

const routes: Routes = [
    {
        path: '',
        component: TeamsComponent,
    },
    {
        path: 'new',
        component: SingleTeamComponent,
        data: {
            title: 'Teams > New Team',
        },
    },
    {
        path: ':id',
        component: SingleTeamComponent,
        data: {
            title: 'Teams > Single Team',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamsRoutingModule {}
