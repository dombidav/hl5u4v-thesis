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
import { LOGIN, RedirectService } from '../services/redirect.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private readonly auth: AuthService, private readonly redirect: RedirectService) {}

    canActivate(
        __route: ActivatedRouteSnapshot,
        __state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isAuthenticated()
    }

    canActivateChild(
        __childRoute: ActivatedRouteSnapshot,
        __state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isAuthenticated()
    }

    canLoad(
        __route: Route,
        __segments: UrlSegment[],
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isAuthenticated()
    }

    private isAuthenticated() {
        const isGuest = !this.auth.token
        if (isGuest) {
            this.redirect.to(LOGIN, {}, true)
        }
        return !isGuest
    }
}
