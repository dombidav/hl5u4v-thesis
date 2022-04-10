import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout/layout.component'
import { AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular'
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, AppFooterModule, AppHeaderModule, AppSidebarModule, AppBreadcrumbModule, ScrollingModule],
    exports: [LayoutComponent],
})
export class SharedComponentsModule {}
