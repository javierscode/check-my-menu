import { RestaurantSlugAlreadyInUseException } from '@application/exceptions/restaurant/restaurant-id-already-in-use.exception'
import { RestaurantIdAlreadyInUseException } from '@application/exceptions/restaurant/restaurant-slug-already-in-use.exception'
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

export type CreateRestaurantRequest = {
  id: string
  name: string
  domain: string
  location: string
  description: string
  ownerId: string
}

@injectable()
export class CreateRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async run({
    id,
    name,
    domain,
    location,
    description,
    ownerId,
  }: CreateRestaurantRequest): Promise<void> {
    const restaurantId = new UuidVO(id)
    const restaurantName = new NameVO(name)
    const restaurantDomain = new SlugVO(domain)
    const restaurantLocation = new LocationVO(location)
    const restaurantDescription = new DescriptionVO(description)
    const restaurantOwner = new UuidVO(ownerId)

    const restaurant = new Restaurant(
      restaurantId,
      restaurantName,
      restaurantDomain,
      restaurantLocation,
      restaurantDescription,
      restaurantOwner
    )

    const foundRestaurantById = await this.restaurantRepository.findById(restaurantId)
    if (foundRestaurantById) throw new RestaurantIdAlreadyInUseException()

    const foundRestaurantBySlug = await this.restaurantRepository.findBySlug(restaurantDomain)
    if (foundRestaurantBySlug) throw new RestaurantSlugAlreadyInUseException()

    await this.restaurantRepository.create(restaurant)
  }
}
