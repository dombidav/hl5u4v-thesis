import { Component } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { RedirectService } from '../../core/services/redirect.service'

@Component({
    selector: 'app-logout',
    template: '<p></p>',
})
export class LogoutComponent {
    constructor(protected readonly auth: AuthService, protected readonly redirect: RedirectService) {}

    // async ionViewWillEnter() {}
}
