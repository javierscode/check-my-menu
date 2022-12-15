import { Dish } from '@domain/entities/dish'
import { DishService } from '@domain/services/dish.service'
import { BACKEND_URL } from '@infrastructure/constants'

import { Fetcher } from './fetcher'

export class FetchDishService implements DishService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getDishById(dishId: string): Promise<Dish | null> {
    throw new Error('Method not implemented.')
  }

  async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    return this.fetcher.get<Dish[]>(`${BACKEND_URL}/dish/?categoryId=${categoryId}`)
  }
}
