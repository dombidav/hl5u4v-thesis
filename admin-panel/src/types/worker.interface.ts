import { IResource } from './resource.interface'

export interface IWorker extends IResource {
    name: string
    rfid: string
    birthdate: string
    telephone: string
}
