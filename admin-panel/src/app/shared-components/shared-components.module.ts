import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout/layout.component'
import { AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CrudTableComponent } from './crud-table/crud-table.component'
import { ToolbarModule } from 'primeng/toolbar'
import { SharedModule } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
    declarations: [LayoutComponent, CrudTableComponent],
    imports: [
        CommonModule,
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        AppBreadcrumbModule,
        ScrollingModule,
        ToolbarModule,
        SharedModule,
        ButtonModule,
        RippleModule,
        TableModule,
        InputTextModule,
    ],
    exports: [LayoutComponent, CrudTableComponent],
})
export class SharedComponentsModule {}
