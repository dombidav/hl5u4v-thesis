import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { IconSetService } from '@coreui/icons-angular'
import { cilUser } from '@coreui/icons'
import { PrimeNGConfig } from 'primeng/api'
import { AuthService } from './core/services/auth.service'

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    public readonly iconSet: IconSetService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly auth: AuthService,
  ) {
    // iconSet singleton
    iconSet.icons = { cilUser }
  }

  ngOnInit() {
    setTimeout(() => console.log(this.auth.user ? `Welcome ${this.auth.user.name}` : 'Guest'), 1000)
    this.primengConfig.ripple = true
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      window.scrollTo(0, 0)
    })
  }
}
