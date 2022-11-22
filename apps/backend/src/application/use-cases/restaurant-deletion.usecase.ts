import { RestaurantNotExistException } from '@application/exceptions/restaurant-not-exist.exception'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from './usecase'

export type RestaurantDeletionRequest = {
  id: string
}

export class RestaurantDeletionUsecase implements Usecase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async run({ id }: RestaurantDeletionRequest): Promise<void> {
    const restaurantId = new UuidVO(id)

    const foundRestaurantById = await this.restaurantRepository.findById(restaurantId)
    if (!foundRestaurantById) throw new RestaurantNotExistException()

    await this.restaurantRepository.remove(restaurantId)
  }
}
