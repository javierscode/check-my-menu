import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'
import { BACKEND_URL } from '@infrastructure/constants'

import { Fetcher } from './fetcher'

export class FetchCategoryService implements CategoryService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getCategoryById(categoryId: string): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }
}
