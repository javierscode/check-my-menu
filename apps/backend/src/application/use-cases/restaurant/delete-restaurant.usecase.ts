import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type DeleteRestaurantRequest = {
  id: string
}

@injectable()
export class DeleteRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({ id }: DeleteRestaurantRequest): Promise<void> {
    const restaurantId = new UuidVO(id)

    const foundRestaurantById = await this.restaurantRepository.findById(restaurantId)
    if (!foundRestaurantById) throw new RestaurantNotExistException()

    await this.restaurantRepository.remove(restaurantId)
  }
}
