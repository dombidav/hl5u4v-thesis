import { INavData } from '@coreui/angular'
import { AuthGuard } from './core/guards/auth.guard'
import { GuestGuard } from './core/guards/guest.guard'
const navItems: (INavData & { canActivate?: () => Promise<boolean> })[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        canActivate: AuthGuard.check,
        // badge: {
        //   variant: 'info',
        //   text: 'NEW'
        // }
    },
    {
        name: 'Login',
        url: '/login',
        icon: 'icon-login',
        canActivate: GuestGuard.check,
    },
    {
        title: true,
        name: 'Workers',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Workers',
        url: '/workers',
        icon: 'icon-briefcase',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Teams',
        url: '/teams',
        icon: 'icon-people',
        canActivate: AuthGuard.check,
    },
    {
        title: true,
        name: 'Manage Locks',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Locks',
        url: '/locks',
        icon: 'icon-lock',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Lock Groups',
        url: '/lock-groups',
        icon: 'icon-organization',
        canActivate: AuthGuard.check,
    },
    {
        title: true,
        name: 'Manage Rules',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Rules',
        url: '/access-rules',
        icon: 'icon-shield',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Check logs',
        url: '/access-logs',
        icon: 'icon-book-open',
        canActivate: AuthGuard.check,
    },
    {
        title: true,
        name: 'Manage Dashboard',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Manage Users',
        url: '/users',
        icon: 'icon-people',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Logout',
        url: '/logout',
        icon: 'icon-logout',
        class: 'mt-auto',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Theme by CoreUI',
        url: 'http://coreui.io/angular/',
        icon: 'icon-cloud-download',
        // class: 'mt-auto',
        variant: 'success',
        attributes: { target: '_blank', rel: 'noopener' },
    },
]

export async function getNavItems(items: (INavData & { canActivate?: () => Promise<boolean> })[] = navItems) {
    const result: (INavData & { canActivate?: () => Promise<boolean> })[] = []
    for (const item of items) {
        if (item.divider) {
            result.push(item)
        } else {
            if (item.canActivate && !(await item.canActivate())) {
                continue
            }
            const navItem = {
                ...item,
                children: item.children ? await getNavItems(item.children) : undefined,
            }
            result.push(navItem)
        }
    }
    return result
}
