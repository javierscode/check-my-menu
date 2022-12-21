import { DishService } from '@server/domain/services/dish.service'
import { Dish } from '@shared/domain/entities/dish'
import { Fetcher } from '@shared/infrastructure/fetcher'

export class FetchDishService implements DishService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    throw new Error('Method not implemented.')
  }

  getDishesByRestaurantId(restaurantId: string, token: string): Promise<Dish[]> {
    throw new Error('Method not implemented.')
  }

  getDishById(dishId: string): Promise<Dish | null> {
    throw new Error('Method not implemented.')
  }

  createDish(token: string, dish: Omit<Dish, 'id'>): Promise<Dish> {
    throw new Error('Method not implemented.')
  }

  editDish(token: string, dish: Dish): Promise<Dish> {
    throw new Error('Method not implemented.')
  }

  deleteDish(token: string, dishId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
