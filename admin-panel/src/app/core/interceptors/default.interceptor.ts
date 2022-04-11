import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router'
import { from, lastValueFrom, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { RedirectService } from '../services/redirect.service'
import { AuthService } from '../services/auth.service'

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
        private readonly redirect: RedirectService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(next, req))
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        // switch (err.status) {
        //     case 401:
        //         this.redirect.push(window.location.href)
        //         this.redirect.to('/login')
        //         break
        //     case 422:
        //     default:
        //         return throwError(() => err)
        // }

        return throwError(() => err)
    }

    private async handle(next: HttpHandler, req: HttpRequest<any>) {
        let token: string | null = null
        if (!req.headers.get('X-AppMeta')?.split(',').includes('NO-AUTH')) {
            token = (await this.auth.token) ?? null
        }
        if (!token?.startsWith('Bearer ')) {
            token = `Bearer ${token}`
        }
        const authReq = req.clone(token ? { headers: req.headers.set('Authorization', token) } : {})

        return lastValueFrom(next.handle(authReq).pipe(catchError((x) => this.handleError(x))))
    }
}
