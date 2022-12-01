import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import { InvalidDishOwnerException } from '@application/exceptions/dish/invalid-dish-owner.exception'
import type { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CheckDishOwnerRequest {
  dishId: string
  ownerId: string
}

@injectable()
export class CheckDishOwnerUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository)
    private readonly dishRepository: DishRepository
  ) {}

  async run({ dishId, ownerId }: CheckDishOwnerRequest): Promise<void> {
    const dishIdVO = new UuidVO(dishId)
    const ownerIdVO = new UuidVO(ownerId)

    const Dish = await this.dishRepository.findById(dishIdVO)
    if (!Dish) throw new DishNotExistException()

    if (!ownerIdVO.equals(Dish.ownerId)) throw new InvalidDishOwnerException()
  }
}
