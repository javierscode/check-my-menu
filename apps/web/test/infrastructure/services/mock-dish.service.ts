import { Dish } from '@domain/entities/dish'
import { DishService } from '@domain/services/dish.service'

import { fakeDishes } from './constants'

export class MockDishService implements DishService {
  async getDishById(dishId: string): Promise<Dish | null> {
    return (await Promise.resolve(fakeDishes.find(d => d.id === dishId))) || null
  }

  async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    return await Promise.resolve(fakeDishes.filter(d => d.categoryIds.includes(categoryId)))
  }
}
