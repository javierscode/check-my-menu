import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import { Restaurant } from '@domain/entities/restaurant.entity'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type GetRestaurantByDomainRequest = {
  domain: string
}

@injectable()
export class GetRestaurantByDomainUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({ domain }: GetRestaurantByDomainRequest): Promise<Restaurant> {
    const Domain = new SlugVO(domain)
    const restaurant = await this.restaurantRepository.findBySlug(Domain)
    if (!restaurant) throw new RestaurantNotExistException()
    return restaurant
  }
}
