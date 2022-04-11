import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { HOME, RedirectService } from '../services/redirect.service'
import { APP_INJECTOR } from '../../app.module'

@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate, CanActivateChild, CanLoad {
    static async check() {
        return !(await APP_INJECTOR.get(AuthService).token)
    }

    constructor(private readonly auth: AuthService, private readonly redirect: RedirectService) {}

    canActivate(
        __route: ActivatedRouteSnapshot,
        __state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.logic()
    }

    canActivateChild(
        __childRoute: ActivatedRouteSnapshot,
        __state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.logic()
    }

    canLoad(
        __route: Route,
        __segments: UrlSegment[],
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.logic()
    }

    public async logic() {
        const isGuest = !(await this.auth.token)
        if (!isGuest) {
            this.redirect.to(HOME, {}, true)
        }
        return isGuest
    }
}
