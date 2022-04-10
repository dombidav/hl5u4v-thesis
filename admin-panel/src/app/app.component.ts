import { Component } from '@angular/core'
import { IconSetService } from '@coreui/icons-angular'

@Component({
    // tslint:disable-next-line
    selector: 'body',
    templateUrl: './app.component.html',
    providers: [IconSetService],
})
export class AppComponent {}
