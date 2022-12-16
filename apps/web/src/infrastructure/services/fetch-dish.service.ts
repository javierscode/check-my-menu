import { Dish } from '@domain/entities/dish'
import { DishService } from '@domain/services/dish.service'
import { BACKEND_URL } from '@infrastructure/constants'

import { Fetcher } from './fetcher'

export class FetchDishService implements DishService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getDishesByRestaurantId(restaurantId: string, token: string): Promise<Dish[]> {
    throw new Error('Method not implemented.')
  }

  getDishById(dishId: string): Promise<Dish | null> {
    throw new Error('Method not implemented.')
  }

  getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    throw new Error('Method not implemented.')
  }
}
