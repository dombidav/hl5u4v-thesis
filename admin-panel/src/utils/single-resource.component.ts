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
        return new Promise<void>((resolve) => {
            this.route.params.subscribe((params) => {
                if (!params.id || params.id === 'new') {
                    this.resource = this.resourceFactory()
                    return
                }
                this.service.read(params.id).subscribe((resource) => {
                    this.resource = resource
                    resolve()
                })
            })
        })
    }

    /**
     * Saves the resource.
     * @param before - Function to be called before saving. First argument is true if the resource is created, the second argument is the resource.
     * @param after - Function to be called after saving. First argument is true if the resource is created, the second argument is the resource.
     */
    save(before?: (bool, T) => void, after?: (bool, T) => void) {
        if (this.check()) return
        if (this.resource.id && this.resource.id !== 'N/A') {
            before?.(false, this.resource)
            this.service.edit(this.resource).subscribe(() => {
                after?.(false, this.resource)
                this.redirect.back()
            })
            return
        }

        before?.(true, this.resource)
        this.service.add(this.resource).subscribe(() => {
            after?.(true, this.resource)
            this.redirect.back()
        })
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
