import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from './usecase'

export type RestaurantListByOwnerRequest = {
  id: string
}
export class RestaurantListByOwnerUsecase implements Usecase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async run({ id }: RestaurantListByOwnerRequest): Promise<Restaurant[]> {
    const ownerId = new UuidVO(id)
    const restaurants = await this.restaurantRepository.findByOwner(ownerId)
    return restaurants
  }
}
