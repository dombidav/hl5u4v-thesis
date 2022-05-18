import { Observable } from 'rxjs'
import { IResource } from './resource.interface'

export interface IResourceService<T extends IResource> {
    browse(): Observable<T[]>
    read(id: string | number): Observable<T>
    edit(resource: Partial<Omit<T, 'id'>> & { id: string | number }): Observable<never>
    add(resource: Partial<Omit<T, 'id'>>): Observable<never>
    destroy(id: string | number): Observable<void>
}
