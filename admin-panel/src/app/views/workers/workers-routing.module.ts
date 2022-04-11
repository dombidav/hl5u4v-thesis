import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WorkersComponent } from './workers.component'
import { SingleWorkerComponent } from './single-worker/single-worker.component'

const routes: Routes = [
    {
        path: '',
        component: WorkersComponent,
    },
    {
        path: 'new',
        component: SingleWorkerComponent,
        data: {
            title: 'Workers > New Worker',
        },
    },
    {
        path: ':id',
        component: SingleWorkerComponent,
        data: {
            title: 'Workers > Single Worker',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorkersRoutingModule {}
