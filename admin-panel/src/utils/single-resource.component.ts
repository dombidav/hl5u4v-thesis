import { IResource } from '../types/resource.interface'
import { NgModel } from '@angular/forms'
import { IResourceService } from '../types/resource-service.interface'
import { RedirectService } from '../app/core/services/redirect.service'
import { ActivatedRoute } from '@angular/router'
import { APP_INJECTOR } from '../app/app.module'
import { Component, OnInit } from '@angular/core'

@Component({
    template: '',
})
export abstract class SingleResourceComponent<T extends IResource> implements OnInit {
    public resource?: T

    public models: NgModel[] = []

    public invalid = false

    private interval: number | null = null

    private redirect: RedirectService

    protected abstract route: ActivatedRoute

    abstract ngOnInit(): void

    protected abstract readonly service: IResourceService<T>

    protected abstract readonly resourceFactory: () => T

    protected constructor() {
        this.redirect = APP_INJECTOR.get(RedirectService)
    }

    init() {
        this.route.params.subscribe((params) => {
            if (!params.id || params.id === 'new') {
                this.resource = this.resourceFactory()
                return
            }
            this.service.read(params.id).subscribe((resource) => (this.resource = resource))
        })
    }

    save() {
        if (this.check()) return
        if (this.resource.id && this.resource.id !== 'N/A') {
            console.log('update', this.resource)
            this.service.edit(this.resource).subscribe(() => this.redirect.back())
            return
        }

        this.service.add(this.resource).subscribe(() => this.redirect.back())
    }

    check() {
        return this.models.some((ngModel) => ngModel.invalid)
    }

    log(message: any) {
        console.log(message)
        return true
    }

    setCheckInterval(ngModels: NgModel[]) {
        if (this.interval) return true

        this.models = ngModels
        this.interval = setInterval(() => (this.invalid = this.check()), 500)

        return true
    }
}
