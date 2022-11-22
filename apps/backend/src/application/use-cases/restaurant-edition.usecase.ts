import { RestaurantNotExistException } from '@application/exceptions/restaurant-not-exist.exception'
import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from './usecase'

export type RestaurantEditionRequest = {
  id: string
  name: string
  domain: string
  location: string
  description: string
}

export class RestaurantEditionUsecase implements Usecase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async run({ id, name, domain, location, description }: RestaurantEditionRequest): Promise<void> {
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
