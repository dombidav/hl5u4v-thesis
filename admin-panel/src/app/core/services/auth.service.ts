import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { api } from '../../../utils/url.tools'
import { ILoginResponse } from '../../../types/login-response.interface'
import { firstValueFrom } from 'rxjs'
import { IUser } from '../../../types/user.interface'

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
    if (this._token) {
      return this._token
    }

    this._token = localStorage.getItem('token')
    return this._token
  }

  constructor(private readonly http: HttpClient) {  }

  async login(cred: { email: string, password: string }) {
    console.log('login', cred)
    const response = await firstValueFrom(this.http.post<ILoginResponse>(api(['auth', 'signin']), cred))
    console.log('login response', response)
    localStorage.setItem('token', response.access_token)
    localStorage.setItem('user', JSON.stringify(response.user))
  }
}
