import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { P404Component } from './views/error/404.component'
import { P500Component } from './views/error/500.component'
import { LoginComponent } from './views/login/login.component'
import { RegisterComponent } from './views/register/register.component'
import { AuthGuard } from './core/guards/auth.guard'
import { GuestGuard } from './core/guards/guest.guard'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404',
        },
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500',
        },
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page',
        },
        canActivate: [GuestGuard],
        canLoad: [GuestGuard],
        canActivateChild: [GuestGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register Page',
        },
        canActivate: [GuestGuard],
        canLoad: [GuestGuard],
        canActivateChild: [GuestGuard],
    },
    {
        path: 'logout',
        loadChildren: () => import('./views/logout/logout.module').then((m) => m.LogoutModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'workers',
        loadChildren: () => import('./views/workers/workers.module').then((m) => m.WorkersModule),
        data: {
            title: 'Workers > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'teams',
        loadChildren: () => import('./views/teams/teams.module').then((m) => m.TeamsModule),
        data: {
            title: 'Teams > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'locks',
        loadChildren: () => import('./views/locks/locks.module').then((m) => m.LocksModule),
        data: {
            title: 'Locks > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'lock-groups',
        loadChildren: () => import('./views/lock-groups/lock-groups.module').then((m) => m.LockGroupsModule),
        data: {
            title: 'Lock Groups > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'access-rules',
        loadChildren: () => import('./views/access-rules/access-rule.module').then((m) => m.AccessRuleModule),
        data: {
            title: 'Access Rules > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'access-logs',
        loadChildren: () => import('./views/access-logs/access-logs.module').then((m) => m.AccessLogsModule),
        data: {
            title: 'Access Logs > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then((m) => m.UsersModule),
        data: {
            title: 'Users > List',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    { path: '**', component: P404Component },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
