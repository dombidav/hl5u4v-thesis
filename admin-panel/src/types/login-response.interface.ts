import { IUser } from './user.interface'

export interface ILoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: IUser
}
