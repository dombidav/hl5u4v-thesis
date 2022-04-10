import { IUser } from '../../../types/user.interface'

export class StorageKey<T> {
  constructor(public key: string) {}
}

export const STORAGE_KEY = {
  JWT_TOKEN: new StorageKey<string>('jwt_token'),
  USER_DATA: new StorageKey<IUser>('user_data'),
}

