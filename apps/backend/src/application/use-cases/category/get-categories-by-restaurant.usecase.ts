import { Category } from '@domain/entities/category.entity'
import type { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface GetCategoriesByRestaurantRequest {
  restaurantId: string
}

@injectable()
export class GetCategoriesByRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async run({ restaurantId }: GetCategoriesByRestaurantRequest): Promise<Category[]> {
    const restaurantIdVO = new UuidVO(restaurantId)

    const categories = await this.categoryRepository.findByRestaurant(restaurantIdVO)

    return categories
  }
}
