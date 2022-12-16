import { Dish } from '@domain/entities/dish'

export interface DishService {
  getDishesByCategoryId(categoryId: string): Promise<Dish[]>
  getDishesByRestaurantId(restaurantId: string, token: string): Promise<Dish[]>
  getDishById(dishId: string): Promise<Dish | null>
}
