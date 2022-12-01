import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from '../usecase'

export interface DeleteDishRequest {
  id: string
}

export class DeleteDishUsecase implements Usecase {
  constructor(private readonly dishRepository: DishRepository) {}
  async run({ id }: DeleteDishRequest): Promise<void> {
    const dishId = new UuidVO(id)
    const foundDishById = await this.dishRepository.findById(dishId)
    if (!foundDishById) throw new DishNotExistException()

    await this.dishRepository.remove(dishId)
  }
}
