import { Dish } from '@domain/entities/dish.entity'
import { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from '../usecase'

export interface GetDishesByCategoryRequest {
  categoryId: string
}

export class GetDishesByCategoryUsecase implements Usecase {
  constructor(private readonly dishRepository: DishRepository) {}

  async run({ categoryId }: GetDishesByCategoryRequest): Promise<Dish[]> {
    const CategoryId = new UuidVO(categoryId)

    const dishes = await this.dishRepository.findByCategory(CategoryId)

    return dishes
  }
}
