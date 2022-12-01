import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import type { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface DeleteDishRequest {
  id: string
}

@injectable()
export class DeleteDishUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository)
    private readonly dishRepository: DishRepository
  ) {}

  async run({ id }: DeleteDishRequest): Promise<void> {
    const dishId = new UuidVO(id)
    const foundDishById = await this.dishRepository.findById(dishId)
    if (!foundDishById) throw new DishNotExistException()

    await this.dishRepository.remove(dishId)
  }
}
