import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LockGroupsComponent } from './lock-groups.component'
import { SingleLockGroupComponent } from './single-lock-group/single-lock-group.component'

const routes: Routes = [
    {
        path: '',
        component: LockGroupsComponent,
    },
    {
        path: 'new',
        component: SingleLockGroupComponent,
        data: {
            title: 'Lock Groups > New Group',
        },
    },
    {
        path: ':id',
        component: SingleLockGroupComponent,
        data: {
            title: 'Lock Groups > Single Group',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LockGroupRoutingModule {}
