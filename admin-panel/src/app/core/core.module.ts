import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { RedirectService } from './services/redirect.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { DefaultInterceptor } from './interceptors/default.interceptor'
import { Router } from '@angular/router'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        AuthService,
        RedirectService,
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (router: Router, auth: AuthService, redirect: RedirectService) =>
                new DefaultInterceptor(auth, router, redirect),
            multi: true,
            deps: [Router, AuthService, RedirectService],
        },
    ],
})
export class CoreModule {}
