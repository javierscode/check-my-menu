import { Category } from '@domain/entities/category'

export interface CategoryService {
  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]>
  getCategoryById(categoryId: string): Promise<Category | null>
  createCategory(token: string, category: Omit<Category, 'id'>): Promise<Category>
  editCategory(token: string, category: Category): Promise<Category>
  deleteCategory(token: string, categoryId: string): Promise<void>
}
