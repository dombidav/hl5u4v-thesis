import { Component } from '@angular/core'
import { ViewWillEnter } from '@ionic/angular'
import { AuthService } from '../../core/services/auth.service'
import { LOGIN, RedirectService } from '../../core/services/redirect.service'

@Component({
    selector: 'app-logout',
    template: '<p></p>',
})
export class LogoutComponent implements ViewWillEnter {
    constructor(protected readonly auth: AuthService, protected readonly redirect: RedirectService) {}

    async ionViewWillEnter() {}
}
