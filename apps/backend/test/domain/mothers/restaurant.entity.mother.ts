import { CreateRestaurantRequest } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { Restaurant } from '@domain/entities/restaurant.entity'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { DescriptionVOMother } from './description.vo.mother'
import { LocationVOMother } from './location.vo.mother'
import { NameVOMother } from './name.vo.mother'
import { SlugVOMother } from './slug.vo.mother'
import { UuidVOMother } from './uuid.vo.mother'

export class RestaurantMother {
  private static create(
    id: UuidVO,
    name: NameVO,
    domain: SlugVO,
    location: LocationVO,
    description: DescriptionVO,
    ownerId: UuidVO
  ): Restaurant {
    return new Restaurant(id, name, domain, location, description, ownerId)
  }

  static fromRequest({
    id,
    name,
    domain,
    location,
    description,
    ownerId,
  }: CreateRestaurantRequest): Restaurant {
    return this.create(
      new UuidVO(id),
      new NameVO(name),
      new SlugVO(domain),
      new LocationVO(location),
      new DescriptionVO(description),
      new UuidVO(ownerId)
    )
  }

  static random(): Restaurant {
    const randomId = UuidVOMother.random()
    const randomName = NameVOMother.random()
    const randomSlug = SlugVOMother.random()
    const randomLocation = LocationVOMother.random()
    const randomDescription = DescriptionVOMother.random()
    const randomOwnerId = UuidVOMother.random()

    return this.create(
      randomId,
      randomName,
      randomSlug,
      randomLocation,
      randomDescription,
      randomOwnerId
    )
  }
}
