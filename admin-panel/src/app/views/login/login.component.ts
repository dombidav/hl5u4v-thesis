import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { HOME, RedirectService } from '../../core/services/redirect.service'
import { presentAlert, presentLoading } from '../../../utils/presentation.tools'
import { getNavItems } from '../../_nav'

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    constructor(private readonly auth: AuthService, private readonly redirect: RedirectService) {}

    ngOnInit() {
        console.log(getNavItems())
    }

    async login(user: HTMLInputElement, psw: HTMLInputElement) {
        const l = await presentLoading('Logging in...')
        try {
            await this.auth.login({
                email: user.value,
                password: psw.value,
            })
            this.redirect.to(HOME)
        } catch (e) {
            console.error(e)
            if (e.status === 401) {
                await presentAlert('Please check your credentials and try again', 'Invalid credentials')
            } else {
                await presentAlert(
                    `The server responded with ${e.status ?? 'Unknown status code'}. See console for details.`,
                    'Something went wrong',
                )
            }
        } finally {
            l.dismiss().then()
        }
    }
}
