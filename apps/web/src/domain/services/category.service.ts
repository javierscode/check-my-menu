import { Category } from '@domain/entities/category'

export interface CategoryService {
  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]>
  getCategoryById(categoryId: string): Promise<Category | null>
}
