import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { IResourceService } from '../../../types/resource-service.interface'
import { IResource } from '../../../types/resource.interface'
import { presentConfirmation, presentLoading } from '../../../utils/presentation.tools'
import { APP_INJECTOR } from '../../app.module'
import { RedirectService } from '../../core/services/redirect.service'
import { MessageService } from 'primeng/api'

/**
 * Universal CRUD data table component.
 */
@Component({
    selector: 'app-crud-table',
    templateUrl: './crud-table.component.html',
    styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent implements OnInit {
    /** Records which are currently selected with the checkbox. */
    @Input() selectedRecords: any[] = []

    /** When triggered, all records are fetched from the server */
    @Input() refresh = new BehaviorSubject(null)

    /** Triggered when a record is selected or deselected. */
    @Output() selectedRecordsChange = new EventEmitter<any[]>()

    /** The records to work with */
    @Input() records!: any[]

    /** Triggered when the records are changed. */
    @Output() recordsChange = new EventEmitter<any[]>()

    /** Determines how many rows are shown at once. */
    @Input() rows = 10

    /** List of the fields which can be filtered. */
    @Input() globalFilterFields: string[] = []

    /** Determines the responsive layout of the table. */
    @Input() layout: 'stack' | 'scroll' = 'scroll'

    /** Determines the resource name to use. Only shown in messages. */
    @Input() resourceName = 'Records'

    /** Determines the resource service to use. */
    @Input() service!: IResourceService<IResource>

    /** The columns to show to the user. */
    @Input() columns: {
        title: string | ((res: any) => string)
        field: any
        sortable?: boolean
        content?: (res: any) => string
    }[] = []

    /** Triggered when the add new button is clicked */
    @Output() onNewClick = new EventEmitter<void>()

    /** Triggered when the edit button is clicked */
    @Output() onEditClick = new EventEmitter<any>()

    /** Triggered when the delete-multiple button is clicked */
    @Output() onDeleteClick = new EventEmitter<any>()

    /** Triggered when the export button is clicked */
    @Output() onExportClick = new EventEmitter<any>()

    /** Determines if the table is loading. */
    loading = false

    /** Called when the table is initialized. Fetches the records from the server, and fills out *globalFilterFields* if empty.*/
    ngOnInit() {
        this.refresh.subscribe(() => this.fetch().then())
        if (!this.globalFilterFields?.length) this.globalFilterFields = this.columns.map((c) => c.field)
    }

    /** Fetches the records from the server. */
    async fetch() {
        const l = await presentLoading(`Loading ${this.resourceName}...`)
        this.loading = true
        const records = await firstValueFrom(this.service.browse())
        this.records = records
        this.recordsChange.emit(records)
        this.selectedRecords = []
        this.selectedRecordsChange.emit(this.selectedRecords)
        await l.dismiss()
        this.loading = false
    }

    /** Navigates to the new record page. */
    openNew() {
        this.onNewClick.emit()
        APP_INJECTOR.get(RedirectService).to(`/${this.resourceName.replace(/ /g, '-').toLowerCase()}/new`)
    }

    /** Deletes records selected by the checkbox */
    async deleteSelectedRecords() {
        if (
            !(await presentConfirmation(
                `Are you sure you want to delete ${this.selectedRecords.length} ${this.resourceName}?`,
            ))
        ) {
            APP_INJECTOR.get(MessageService).add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: `${this.selectedRecords.length} ${this.resourceName} not deleted`,
            })
            return
        }
        const l = await presentLoading(`Deleting ${this.selectedRecords.length} ${this.resourceName}...`)
        this.loading = true
        const promises = this.selectedRecords.map((record) => {
            this.records = this.records.filter((r) => r.id !== record.id)
            return firstValueFrom(this.service.destroy(record.id))
        })
        await Promise.all(promises)
        await l.dismiss()
        this.loading = false
        APP_INJECTOR.get(MessageService).add({
            severity: 'success',
            summary: `${this.selectedRecords.length} ${this.resourceName} deleted`,
        })
    }

    /** Opens the edit page for the record. */
    editRecord(item: any) {
        this.onEditClick.emit(item)
        APP_INJECTOR.get(RedirectService).to(`/${this.resourceName.replace(/ /g, '-').toLowerCase()}/${item.id}`)
    }

    /** Deletes the record. */
    async deleteRecord(item: any) {
        if (!(await presentConfirmation('Are you sure you want to delete this record?'))) {
            APP_INJECTOR.get(MessageService).add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: `${this.resourceName} not deleted`,
            })
            return
        }
        const l = await presentLoading(`Deleting ${this.resourceName}...`)
        this.loading = true
        this.onDeleteClick.emit(item)
        await firstValueFrom(this.service.destroy(item.id))
        this.records = this.records.filter((r) => r.id !== item.id)
        await l.dismiss()
        this.loading = false
        APP_INJECTOR.get(MessageService).add({
            severity: 'success',
            summary: `${this.resourceName} deleted`,
        })
    }
}
