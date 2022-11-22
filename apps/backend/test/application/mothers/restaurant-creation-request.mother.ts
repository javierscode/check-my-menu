import { RestaurantCreationRequest } from '@application/use-cases/restaurant-creation.usecase'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'

export class RestaurantCreationRequestMother {
  static create(
    id: UuidVO,
    name: NameVO,
    domain: SlugVO,
    location: LocationVO,
    description: DescriptionVO,
    ownerId: UuidVO
  ): RestaurantCreationRequest {
    return {
      id: id.value,
      name: name.value,
      domain: domain.value,
      location: location.value,
      description: description.value,
      ownerId: ownerId.value,
    }
  }

  static random(): RestaurantCreationRequest {
    const randomRestaurant = RestaurantMother.random()
    return this.create(
      randomRestaurant.id,
      randomRestaurant.name,
      randomRestaurant.domain,
      randomRestaurant.location,
      randomRestaurant.description,
      randomRestaurant.ownerId
    )
  }

  static invalidRequest(): RestaurantCreationRequest {
    const randomRestaurant = RestaurantMother.random()

    return {
      id: MotherCreator.random().lorem.words(),
      name: randomRestaurant.name.value,
      domain: randomRestaurant.domain.value,
      location: randomRestaurant.location.value,
      description: randomRestaurant.description.value,
      ownerId: randomRestaurant.ownerId.value,
    }
  }
}
