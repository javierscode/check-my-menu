import { Dish } from '@domain/entities/dish.entity'
import type { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface GetDishesByCategoryRequest {
  categoryId: string
}

@injectable()
export class GetDishesByCategoryUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository)
    private readonly dishRepository: DishRepository
  ) {}

  async run({ categoryId }: GetDishesByCategoryRequest): Promise<Dish[]> {
    const CategoryId = new UuidVO(categoryId)

    const dishes = await this.dishRepository.findByCategory(CategoryId)

    return dishes
  }
}
