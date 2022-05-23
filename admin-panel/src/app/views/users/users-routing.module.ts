import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UsersComponent } from './users.component'
import { SingleUserComponent } from './single-user/single-user.component'

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
    },
    {
        path: 'new',
        component: SingleUserComponent,
        data: {
            title: 'Users > New User',
        },
    },
    {
        path: ':id',
        component: SingleUserComponent,
        data: {
            title: 'Users > Single User',
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
