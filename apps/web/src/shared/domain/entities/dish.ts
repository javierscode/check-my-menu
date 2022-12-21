import { Allergen } from './allergen'
import { RootEntity } from './root'

export interface Dish extends RootEntity {
  name: string
  description: string
  image: string
  price: number
  allergens: Allergen[]
  categoryIds: string[]
  restaurantId: string
}
