import { DishService } from '@server/domain/services/dish.service'
import { Dish } from '@shared/domain/entities/dish'

import { fakeDishes } from './constants'

export class InMemoryDishService implements DishService {
  async createDish(token: string, dish: Omit<Dish, 'id'>): Promise<Dish> {
    const newDish: Dish = {
      id: Math.random().toString(36).substr(2, 9),
      ...dish,
    }
    await Promise.resolve(fakeDishes.push(newDish))
    return newDish
  }

  async editDish(token: string, dish: Dish): Promise<Dish> {
    const foundDish = fakeDishes.find(d => d.id === dish.id)
    if (!foundDish) throw new Error('Dish not found')
    fakeDishes.splice(fakeDishes.indexOf(foundDish), 1, dish)
    return await Promise.resolve(dish)
  }

  async deleteDish(token: string, dishId: string): Promise<void> {
    const foundDish = fakeDishes.find(d => d.id === dishId)
    if (!foundDish) throw new Error('Dish not found')
    fakeDishes.splice(fakeDishes.indexOf(foundDish), 1)
    return await Promise.resolve()
  }

  async getDishesByRestaurantId(restaurantId: string, _: string): Promise<Dish[]> {
    return await Promise.resolve(fakeDishes.filter(d => d.restaurantId === restaurantId))
  }

  async getDishById(dishId: string): Promise<Dish | null> {
    return (await Promise.resolve(fakeDishes.find(d => d.id === dishId))) || null
  }

  async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    return await Promise.resolve(fakeDishes.filter(d => d.categoryIds.includes(categoryId)))
  }
}
