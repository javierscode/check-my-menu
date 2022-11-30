import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { InvalidCategoryOfRestaurant } from '@application/exceptions/category/invalid-category-of-restaurant'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export interface CheckCategoryOfRestaurantRequest {
  restaurantId: string
  categoryId: string
}

export class CheckCategoryOfRestaurantUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ restaurantId, categoryId }: CheckCategoryOfRestaurantRequest): Promise<void> {
    const restaurantIdVO = new UuidVO(restaurantId)
    const categoryIdVO = new UuidVO(categoryId)

    const category = await this.categoryRepository.findById(categoryIdVO)
    if (!category) throw new CategoryNotExistException()

    if (!category.restaurantId.equals(restaurantIdVO)) throw new InvalidCategoryOfRestaurant()
  }
}
