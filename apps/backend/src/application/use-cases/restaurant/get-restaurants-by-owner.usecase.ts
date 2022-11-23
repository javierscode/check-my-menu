import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from '../usecase'

export type GetRestaurantsByOwnerRequest = {
  id: string
}
export class GetRestaurantsByOwnerUsecase implements Usecase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async run({ id }: GetRestaurantsByOwnerRequest): Promise<Restaurant[]> {
    const ownerId = new UuidVO(id)
    const restaurants = await this.restaurantRepository.findByOwner(ownerId)
    return restaurants
  }
}
