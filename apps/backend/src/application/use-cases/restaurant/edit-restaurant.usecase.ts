import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import { Restaurant } from '@domain/entities/restaurant.entity'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type EditRestaurantRequest = {
  id: string
  name: string
  domain: string
  location: string
  description: string
}

@injectable()
export class EditRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({ id, name, domain, location, description }: EditRestaurantRequest): Promise<void> {
    const restaurantId = new UuidVO(id)
    const restaurantName = new NameVO(name)
    const restaurantDomain = new SlugVO(domain)
    const restaurantLocation = new LocationVO(location)
    const restaurantDescription = new DescriptionVO(description)

    const foundRestaurantById = await this.restaurantRepository.findById(restaurantId)
    if (!foundRestaurantById) throw new RestaurantNotExistException()

    const restaurant = new Restaurant(
      restaurantId,
      restaurantName,
      restaurantDomain,
      restaurantLocation,
      restaurantDescription,
      foundRestaurantById.ownerId
    )
    await this.restaurantRepository.update(restaurant)
  }
}
