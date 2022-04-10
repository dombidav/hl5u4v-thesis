import { Component } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  constructor(private readonly auth: AuthService) {
  }

  async login(user: HTMLInputElement, psw: HTMLInputElement) {
    await this.auth.login({
      email: user.value,
      password: psw.value,
    }).then(res => console.log(res))


  }
}
