import { CategoryService } from '@server/domain/services/category.service'
import { Category } from '@shared/domain/entities/category'
import { Fetcher } from '@shared/infrastructure/fetcher'

export class FetchCategoryService implements CategoryService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }

  getCategoryById(categoryId: string): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  createCategory(token: string, category: Omit<Category, 'id'>): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  editCategory(token: string, category: Category): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  deleteCategory(token: string, categoryId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
