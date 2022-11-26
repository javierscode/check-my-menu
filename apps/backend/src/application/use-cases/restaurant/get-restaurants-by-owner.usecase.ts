import { Restaurant } from '@domain/entities/restaurant.entity'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type GetRestaurantsByOwnerRequest = {
  id: string
}

@injectable()
export class GetRestaurantsByOwnerUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({ id }: GetRestaurantsByOwnerRequest): Promise<Restaurant[]> {
    const ownerId = new UuidVO(id)
    const restaurants = await this.restaurantRepository.findByOwner(ownerId)
    return restaurants
  }
}
