import { APP_INJECTOR } from '../../app.module'
import { HttpClient } from '@angular/common/http'
import { api } from '../../../utils/url.tools'
import { IResourceService } from '../../../types/resource-service.interface'
import { IResource } from '../../../types/resource.interface'
import { map } from 'rxjs'
import { omit } from '../../../utils/object.tools'

export class ResourceService<T extends IResource> implements IResourceService<T> {
    private http: HttpClient

    constructor(private readonly path: string) {
        this.http = APP_INJECTOR.get(HttpClient)
    }

    browse() {
        return this.http.get<{ data: T[] }>(api(this.path)).pipe(map((res) => res.data))
    }

    read(id: string | number) {
        return this.http.get<{ data: T }>(api([this.path, id.toString()])).pipe(map((res) => res.data))
    }

    edit(resource: Partial<Omit<T, 'id'>> & { id: string | number }) {
        return this.http
            .put<{ data: T }>(api([this.path, resource.id.toString()]), omit(resource, 'id'))
            .pipe(map((res) => res.data))
    }

    add(resource: Partial<Omit<T, 'id'>>) {
        return this.http.post<{ data: T }>(api(this.path), resource).pipe(map((res) => res.data))
    }

    destroy(id: string | number) {
        return this.http.delete(api([this.path, id.toString()])).pipe(map(() => null))
    }
}
