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
        url: '/rules',
        icon: 'icon-shield',
        canActivate: AuthGuard.check,
    },
    {
        name: 'Check logs',
        url: '/logs',
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
    // {
    //   title: true,
    //   name: 'Theme'
    // },
    // {
    //   name: 'Colors',
    //   url: '/theme/colors',
    //   icon: 'icon-drop'
    // },
    // {
    //   name: 'Typography',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil'
    // },
    // {
    //   title: true,
    //   name: 'Components'
    // },
    // {
    //   name: 'Base',
    //   url: '/base',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Cards',
    //       url: '/base/cards',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Carousels',
    //       url: '/base/carousels',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Collapses',
    //       url: '/base/collapses',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Forms',
    //       url: '/base/forms',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Navbars',
    //       url: '/base/navbars',
    //       icon: 'icon-puzzle'
    //
    //     },
    //     {
    //       name: 'Pagination',
    //       url: '/base/paginations',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Popovers',
    //       url: '/base/popovers',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Progress',
    //       url: '/base/progress',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Switches',
    //       url: '/base/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/base/tables',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tabs',
    //       url: '/base/tabs',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tooltips',
    //       url: '/base/tooltips',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },
    // {
    //   name: 'Disabled',
    //   url: '/dashboard',
    //   icon: 'icon-ban',
    //   badge: {
    //     variant: 'secondary',
    //     text: 'NEW'
    //   },
    //   attributes: { disabled: true },
    // },
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
