import { RootEntity } from './root'

export interface User extends RootEntity {
  name: string
  lastname: string
  email: string
  token: string
}
