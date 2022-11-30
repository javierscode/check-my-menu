import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from '../usecase'

export interface GetCategoriesByRestaurantRequest {
  restaurantId: string
}

export class GetCategoriesByRestaurantUsecase implements Usecase {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ restaurantId }: GetCategoriesByRestaurantRequest): Promise<Category[]> {
    const restaurantIdVO = new UuidVO(restaurantId)

    const categories = await this.categoryRepository.findByRestaurant(restaurantIdVO)

    return categories
  }
}
