import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../core/services/auth.service'
import { LOGIN, RedirectService } from '../../core/services/redirect.service'

@NgModule({
    imports: [CommonModule],
})
export class LogoutModule {
    constructor(protected readonly auth: AuthService, protected readonly redirect: RedirectService) {
        this.auth.logout().then(() => this.redirect.to(LOGIN, {}, true))
    }
}
