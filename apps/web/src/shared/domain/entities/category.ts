import { RootEntity } from './root'

export interface Category extends RootEntity {
  name: string
  description: string
  image: string
  restaurantId: string
}
