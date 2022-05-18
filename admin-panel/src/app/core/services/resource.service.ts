import { APP_INJECTOR } from '../../app.module'
import { HttpClient } from '@angular/common/http'
import { api } from '../../../utils/url.tools'
import { IResourceService } from '../../../types/resource-service.interface'
import { IResource } from '../../../types/resource.interface'
import { first, map } from 'rxjs'
import { omit } from '../../../utils/object.tools'

/**
 * Service for CRUD operations on resources
 * @template T Resource type
 */
export class ResourceService<T extends IResource> implements IResourceService<T> {

    /**
     * Create a new resource
     * @param path Path to the resource on the api. Example: if the URI is `.../api/users`, the path is `users`
     * @param http HttpClient instance. If not provided, the Angular default one will be used @ref: https://angular.io/api/common/http/HttpClient
     */
    constructor(private readonly path: string, private readonly http: HttpClient = null) {
        this.http = http ?? APP_INJECTOR.get(HttpClient)
    }

    /**
     * Get all resources as an array.
     * @returns Observable of resources. The observable will be completed when the request is completed
     */
    browse() {
        return this.http.get<{ data: T[] }>(api(this.path))
            .pipe(map((res) => res.data))
            .pipe(first())
    }

    /**
     * Get a resource by its id
     * @param id Id of the resource
     * @returns Observable of the resource. The observable will be completed when the request is completed
     */
    read(id: string | number) {
        return this.http.get<{ data: T }>(api([this.path, id.toString()]))
            .pipe(map((res) => res.data))
            .pipe(first())
    }

    /**
     * Create a new resource
     * @param resource Resource to create
     * @returns Observable of the created resource. The observable will be completed when the request is completed
     */
    edit(resource: Partial<Omit<T, 'id'>> & { id: string | number }) {
        return this.http
            .put<never>(api([this.path, resource.id.toString()]), omit(resource, 'id'))
            .pipe(first())
    }

    /**
     * Update a resource
     * @param resource Resource to update
     * @returns Observable of the updated resource. The observable will be completed when the request is completed
     */
    add(resource: Partial<Omit<T, 'id'>>) {
        return this.http.post<never>(api(this.path), omit(resource, 'id' as any))
            .pipe(first())
    }

    /**
     * Delete a resource
     * @param id Id of the resource to delete
     * @returns Observable of null. The observable will be completed when the request is completed
     */
    destroy(id: string | number) {
        return this.http.delete(api([this.path, id.toString()]))
            .pipe(map(() => null))
            .pipe(first())
    }
}
