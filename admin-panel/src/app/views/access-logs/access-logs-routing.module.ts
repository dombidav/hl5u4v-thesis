import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccessLogsComponent } from './access-logs.component'
import { SingleAccessLogComponent } from './single-access-log/single-access-log.component'

const routes: Routes = [
    {
        path: '',
        component: AccessLogsComponent,
    },
    {
        path: ':id',
        component: SingleAccessLogComponent,
        data: {
            title: 'Access Logs > Single record',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccessLogsRoutingModule {}
