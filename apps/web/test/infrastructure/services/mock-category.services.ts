import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'

import { fakeCategories } from './constants'

export class MockCategoryService implements CategoryService {
  async getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    return await Promise.resolve(fakeCategories.filter(c => c.restaurantId === restaurantId))
  }
}
