import { Dish } from '@domain/entities/dish'

export interface DishService {
  getDishesByCategoryId(categoryId: string): Promise<Dish[]>
  getDishesByRestaurantId(restaurantId: string, token: string): Promise<Dish[]>
  getDishById(dishId: string): Promise<Dish | null>
  createDish(token: string, dish: Omit<Dish, 'id'>): Promise<Dish>
  editDish(token: string, dish: Dish): Promise<Dish>
  deleteDish(token: string, dishId: string): Promise<void>
}
