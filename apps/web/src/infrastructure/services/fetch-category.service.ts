import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'

import { Fetcher } from './fetcher'

export class FetchCategoryService implements CategoryService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    return this.fetcher.get<Category[]>(`/category/?restaurantId=${restaurantId}`)
  }
}
