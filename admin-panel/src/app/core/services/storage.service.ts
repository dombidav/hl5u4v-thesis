import { Injectable } from '@angular/core'

import { Storage } from '@ionic/storage-angular'
import { StorageKey } from '../consts/storage.keys'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    _storage: Storage | null = null

    constructor(public storage: Storage) {
        this.init().then()
    }

    _ready = false

    get ready(): boolean {
        return this._ready
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        this._storage = await this.storage.create()
        this._ready = true
    }

    async set<T = any>(token: StorageKey<T>, value: T) {
        await this.waitForStorage()
        await this._storage?.set(token.key, value)
    }

    async get<T = any>(token: StorageKey<T>): Promise<T | null> {
        await this.waitForStorage()
        return (await this._storage?.get(token.key)) ?? null
    }

    async remove<T = any>(token: StorageKey<T>): Promise<T | null> {
        await this.waitForStorage()
        return this._storage?.remove(token.key)
    }

    async waitForStorage() {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        while (!this.ready) await new Promise((resolve) => setTimeout(resolve, 250))
        return this._storage
    }
}
