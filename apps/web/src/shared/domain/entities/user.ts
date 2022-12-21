import { RootEntity } from './root'

export interface UserData extends RootEntity {
  name: string
  lastname: string
  email: string
}

export interface User extends UserData {
  password: string
}
