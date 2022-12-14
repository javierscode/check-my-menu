import { Dish } from '@domain/entities/dish'

export interface DishService {
  getDishesByCategoryId(categoryId: string): Promise<Dish[]>
}
