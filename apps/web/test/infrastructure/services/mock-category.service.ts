import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'

import { fakeCategories } from './constants'

export class MockCategoryService implements CategoryService {
  async getCategoryById(categoryId: string): Promise<Category | null> {
    return await Promise.resolve(fakeCategories.find(c => c.id === categoryId) || null)
  }

  async getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    return await Promise.resolve(fakeCategories.filter(c => c.restaurantId === restaurantId))
  }
}
