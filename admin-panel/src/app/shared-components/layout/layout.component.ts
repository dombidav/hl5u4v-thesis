import { Component, OnInit } from '@angular/core'
import { IconSetService } from '@coreui/icons-angular'
import { PrimeNGConfig } from 'primeng/api'
import { cilUser } from '@coreui/icons'
import { navItems } from '../../_nav'
import { IUser } from '../../../types/user.interface'
import { AuthService } from '../../core/services/auth.service'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(
        public readonly iconSet: IconSetService,
        private readonly primengConfig: PrimeNGConfig,
        private readonly auth: AuthService,
    ) {
        // iconSet singleton
        iconSet.icons = { cilUser }
    }

    public sidebarMinimized = false

    public navItems = navItems

    user?: IUser

    toggleMinimize(e) {
        this.sidebarMinimized = e
    }

    ngOnInit() {
        this.primengConfig.ripple = true
        this.user = this.auth.user
    }
}
