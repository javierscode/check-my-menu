import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { injectable } from 'inversify'

const RESTAURANTS_DDBB: Restaurant[] = []

@injectable()
export class InMemoryRestaurantRepository implements RestaurantRepository {
  findByOwner(ownerId: UuidVO): Promise<Restaurant[]> {
    const foundRestaurants = RESTAURANTS_DDBB.filter(restaurant =>
      restaurant.ownerId.equals(ownerId)
    )
    return Promise.resolve(foundRestaurants)
  }

  findBySlug(slug: SlugVO): Promise<Restaurant | null> {
    const foundRestaurant = RESTAURANTS_DDBB.find(restaurant => restaurant.domain.equals(slug))
    return Promise.resolve(foundRestaurant ?? null)
  }

  findById(id: UuidVO): Promise<Restaurant | null> {
    const foundRestaurant = RESTAURANTS_DDBB.find(restaurant => restaurant.id.equals(id))
    return Promise.resolve(foundRestaurant ?? null)
  }

  create(domainEntity: Restaurant): Promise<void> {
    const foundRestaurant = RESTAURANTS_DDBB.find(restaurant =>
      restaurant.id.equals(domainEntity.id)
    )
    if (foundRestaurant) throw new Error('Restaurant already exists')
    RESTAURANTS_DDBB.push(domainEntity)
    return Promise.resolve()
  }

  update(domainEntity: Restaurant): Promise<void> {
    const foundIndex = RESTAURANTS_DDBB.findIndex(restaurant =>
      restaurant.id.equals(domainEntity.id)
    )
    if (foundIndex !== -1) RESTAURANTS_DDBB[foundIndex] = domainEntity
    return Promise.resolve()
  }

  remove(id: UuidVO): Promise<void> {
    const foundIndex = RESTAURANTS_DDBB.findIndex(restaurant => restaurant.id.equals(id))
    if (foundIndex) RESTAURANTS_DDBB.splice(foundIndex, 1)
    return Promise.resolve()
  }
}
