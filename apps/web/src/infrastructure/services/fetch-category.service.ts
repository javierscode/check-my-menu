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
    return this.fetcher.get<Category>(`${BACKEND_URL}/category/${categoryId}`)
  }

  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    return this.fetcher.get<Category[]>(`${BACKEND_URL}/category/?restaurantId=${restaurantId}`)
  }
}
