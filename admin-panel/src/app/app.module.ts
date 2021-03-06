import { BrowserModule } from '@angular/platform-browser'
import { Injector, NgModule } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular'

import { AppComponent } from './app.component'
import { P404Component } from './views/error/404.component'
import { P500Component } from './views/error/500.component'
import { LoginComponent } from './views/login/login.component'
import { RegisterComponent } from './views/register/register.component'

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing'

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular'
import { Drivers } from '@ionic/storage'
import { RouteReuseStrategy } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { SharedComponentsModule } from './shared-components/shared-components.module'
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { StorageService } from './core/services/storage.service'
import { jwtOptionsFactory } from '../utils/jwt-options.factory'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'

/** Exposed injector for utility classes and tests */
export let APP_INJECTOR: Injector

@NgModule({
    imports: [
        BrowserModule,
        SharedComponentsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({ name: '_hl5u4v', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] }),
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        IconModule,
        IconSetModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [StorageService],
            },
        }),
        CoreModule,
        ToastModule,
        ConfirmDialogModule,
    ],
    declarations: [AppComponent, P404Component, P500Component, LoginComponent, RegisterComponent],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        MessageService,
        ConfirmationService,
        IconSetService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        APP_INJECTOR = this.injector
    }
}
