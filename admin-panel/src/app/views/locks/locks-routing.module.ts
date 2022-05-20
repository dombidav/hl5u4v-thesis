import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LocksComponent } from './locks.component'
import { SingleLockComponent } from './single-lock/single-lock.component'

const routes: Routes = [
    {
        path: '',
        component: LocksComponent,
    },
    {
        path: 'new',
        component: SingleLockComponent,
        data: {
            title: 'Workers > New Worker',
        },
    },
    {
        path: ':id',
        component: SingleLockComponent,
        data: {
            title: 'Workers > Single Worker',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocksRoutingModule {}
