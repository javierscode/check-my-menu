import { RootEntity } from './root'

export interface Restaurant extends RootEntity {
  name: string
  domain: string
  location: string
  description: string
}
