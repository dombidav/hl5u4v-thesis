import { Observable } from 'rxjs'
import { IResource } from './resource.interface'

export interface IResourceService<T extends IResource> {
    browse(): Observable<T[]>
    read(id: string | number): Observable<T>
    edit(resource: Partial<Omit<T, 'id'>> & { id: string | number }): Observable<T>
    add(resource: Partial<Omit<T, 'id'>>): Observable<T>
    destroy(id: string | number): Observable<void>
}
