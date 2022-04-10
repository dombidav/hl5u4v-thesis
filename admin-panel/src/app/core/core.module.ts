import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { RedirectService } from './services/redirect.service'
import { ConfirmationService } from 'primeng/api'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { DefaultInterceptor } from './interceptors/default.interceptor'
import { Router } from '@angular/router'
import { StorageService } from './services/storage.service'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        AuthService,
        RedirectService,
        ConfirmationService,
        RedirectService,
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (router: Router, storage: StorageService, redirect: RedirectService) =>
                new DefaultInterceptor(storage, router, redirect),
            multi: true,
            deps: [Router, StorageService, RedirectService],
        },
    ],
})
export class CoreModule {}
