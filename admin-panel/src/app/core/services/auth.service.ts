import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { api } from '../../../utils/url.tools'
import { ILoginResponse } from '../../../types/login-response.interface'
import { firstValueFrom, retry, throwError } from 'rxjs'
import { IUser } from '../../../types/user.interface'
import { StorageService } from './storage.service'
import { STORAGE_KEY } from '../consts/storage.keys'
import { JwtHelperService } from '@auth0/angular-jwt'
import { catchError } from 'rxjs/operators'
import { jwtIsExpired } from '../../../utils/jwt-options.factory'
import { IJwtToken } from '../../../types/jwt-token.interface'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _user?: IUser

    private _token?: string

    /** Returns the remaining exp time for the active token in seconds */
    async getRemainingTime() {
        return this.jwtHelper.decodeToken<IJwtToken>(await this.token).exp - Date.now() / 1000
    }

    get user(): Promise<IUser | undefined> {
        return this.getUser()
    }

    get token(): Promise<string | undefined> {
        return this.getToken()
    }

    protected async getUser() {
        if (!this._user) {
            this._user = await this.storage.get(STORAGE_KEY.USER_DATA)
        }
        return this._user
    }

    protected async getToken() {
        if (!this._token) {
            this._token = await this.storage.get(STORAGE_KEY.JWT_TOKEN)
        }

        if (jwtIsExpired(this.jwtHelper.decodeToken(this._token))) {
            this._token = undefined
            await this.storage.remove(STORAGE_KEY.JWT_TOKEN)
            console.debug('AuthService: token expired')
        }

        return this._token
    }

    constructor(
        private readonly http: HttpClient,
        private readonly storage: StorageService,
        public jwtHelper: JwtHelperService,
    ) {}

    async login(cred: { email: string; password: string }) {
        const response = await firstValueFrom(
            this.http
                .post<ILoginResponse>(api(['auth', 'signin']), cred, { headers: { 'X-AppMeta': 'NO-401-INTERCEPT' } })
                .pipe(
                    retry(1),
                    catchError((err) => throwError(() => err)),
                ),
        )
        console.debug('AuthService: user logged in')
        await Promise.all([
            this.storage.set(STORAGE_KEY.JWT_TOKEN, response.access_token),
            this.storage.set(STORAGE_KEY.USER_DATA, response.user),
        ])
        console.debug('AuthService: user data saved')
    }

    async logout() {
        await Promise.all([this.storage.remove(STORAGE_KEY.JWT_TOKEN), this.storage.remove(STORAGE_KEY.USER_DATA)])
        this._token = undefined
        this._user = undefined
        console.debug('AuthService: user logged out')
    }
}
