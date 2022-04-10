import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { api } from '../../../utils/url.tools'
import { ILoginResponse } from '../../../types/login-response.interface'
import { firstValueFrom } from 'rxjs'
import { IUser } from '../../../types/user.interface'
import { StorageService } from './storage.service'
import { STORAGE_KEY } from '../consts/storage.keys'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _user?: IUser

    private _token?: string

    get user(): IUser | undefined {
        if (this._user) {
            return this._user
        }

        const userJSON = localStorage.getItem('user')
        if (userJSON) {
            this._user = JSON.parse(userJSON)
        }
        return this._user
    }

    get token(): string | undefined {
        if (!this._token) {
            this._token = localStorage.getItem('token')
        }

        if (this.jwtHelper.isTokenExpired(this._token)) {
            this._token = undefined
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
        const response = await firstValueFrom(this.http.post<ILoginResponse>(api(['auth', 'signin']), cred))
        await Promise.all([
            this.storage.set(STORAGE_KEY.JWT_TOKEN, response.access_token),
            this.storage.set(STORAGE_KEY.USER_DATA, response.user),
        ])
    }
}
