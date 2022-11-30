import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { InvalidCategoryOfRestaurant } from '@application/exceptions/category/invalid-category-of-restaurant'
import type { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CheckCategoryOfRestaurantRequest {
  restaurantId: string
  categoryId: string
}
@injectable()
export class CheckCategoryOfRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async run({ restaurantId, categoryId }: CheckCategoryOfRestaurantRequest): Promise<void> {
    const restaurantIdVO = new UuidVO(restaurantId)
    const categoryIdVO = new UuidVO(categoryId)

    const category = await this.categoryRepository.findById(categoryIdVO)
    if (!category) throw new CategoryNotExistException()

    if (!category.restaurantId.equals(restaurantIdVO)) throw new InvalidCategoryOfRestaurant()
  }
}
