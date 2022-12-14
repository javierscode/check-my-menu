import { Dish } from '@domain/entities/dish'
import { DishService } from '@domain/services/dish.service'

import { Fetcher } from './fetcher'

export class FetchDishService implements DishService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    return this.fetcher.get<Dish[]>(`/dish/?categoryId=${categoryId}`)
  }
}
