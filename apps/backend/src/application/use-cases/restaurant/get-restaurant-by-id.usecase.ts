import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import { Restaurant } from '@domain/entities/restaurant.entity'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type GetRestaurantByIdRequest = {
  id: string
}

@injectable()
export class GetRestaurantByIdUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({ id }: GetRestaurantByIdRequest): Promise<Restaurant> {
    const Id = new UuidVO(id)
    const restaurant = await this.restaurantRepository.findById(Id)
    if (!restaurant) throw new RestaurantNotExistException()
    return restaurant
  }
}
