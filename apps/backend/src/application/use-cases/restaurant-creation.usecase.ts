import { RestaurantSlugAlreadyInUseException } from '@application/exceptions/restaurant-id-already-in-use.exception'
import { RestaurantOwnerIdNotExistException } from '@application/exceptions/restaurant-owner-id-not-exist.exception'
import { RestaurantIdAlreadyInUseException } from '@application/exceptions/restaurant-slug-already-in-use.exception'
import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UserRepository } from '@domain/repositories/user.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from './usecase'

export type RestaurantCreationRequest = {
  id: string
  name: string
  domain: string
  location: string
  description: string
  ownerId: string
}

export class RestaurantCreationUsecase implements Usecase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private userRepository: UserRepository
  ) {}

  async run({
    id,
    name,
    domain,
    location,
    description,
    ownerId,
  }: RestaurantCreationRequest): Promise<void> {
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
    const owner = await this.userRepository.findById(restaurantOwner)
    if (!owner) throw new RestaurantOwnerIdNotExistException()

    const foundRestaurantById = await this.restaurantRepository.findById(restaurantId)
    if (foundRestaurantById) throw new RestaurantIdAlreadyInUseException()

    const foundRestaurantBySlug = await this.restaurantRepository.findBySlug(restaurantDomain)
    if (foundRestaurantBySlug) throw new RestaurantSlugAlreadyInUseException()

    await this.restaurantRepository.create(restaurant)
  }
}
