import { Component, OnDestroy, OnInit } from '@angular/core'
import { IconSetService } from '@coreui/icons-angular'
import { PrimeNGConfig } from 'primeng/api'
import { cilUser } from '@coreui/icons'
import { IUser } from '../../../types/user.interface'
import { AuthService } from '../../core/services/auth.service'
import { getNavItems } from '../../_nav'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
    private intervalID?: number

    constructor(
        public readonly iconSet: IconSetService,
        private readonly primengConfig: PrimeNGConfig,
        private readonly auth: AuthService,
    ) {
        iconSet.icons = { cilUser }
    }

    public sidebarMinimized = false

    public navItems = []

    remainingTime: number

    user?: IUser

    toggleMinimize(e) {
        this.sidebarMinimized = e
    }

    async ngOnInit() {
        this.primengConfig.ripple = true
        this.user = await this.auth.user
        this.remainingTime = await this.auth.getRemainingTime()
        this.intervalID = setInterval(() => (this.remainingTime = this.remainingTime - 1), 1000)
        setTimeout(async () => (this.navItems = await getNavItems()), 50)
    }

    ngOnDestroy() {
        clearInterval(this.intervalID)
    }

    /**
     * Source: https://stackoverflow.com/a/5539081
     * @param d
     */
    secondsToHms(d: number) {
        const m = Math.floor((d % 3600) / 60)
        const s = Math.floor((d % 3600) % 60)

        return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2)
    }
}
