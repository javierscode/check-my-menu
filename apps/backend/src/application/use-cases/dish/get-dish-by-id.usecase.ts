import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import { Dish } from '@domain/entities/dish.entity'
import { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface GetDishByIdRequest {
  id: string
}

@injectable()
export class GetDishByIdUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository) private readonly repository: DishRepository
  ) {}

  async run({ id }: GetDishByIdRequest): Promise<Dish> {
    const Id = new UuidVO(id)
    const dish = await this.repository.findById(Id)
    if (!dish) throw new DishNotExistException()
    return dish
  }
}
