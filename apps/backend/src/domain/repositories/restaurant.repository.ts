import { Restaurant } from '@domain/entities/restaurant.entity'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { RootRepository } from './root.repository'

/**
 * Restaurant repository
 */
export interface RestaurantRepository extends RootRepository<Restaurant> {
  /**
   * Finds a Restaurant by owner
   * @param ownerId Restaurant owner
   * @returns Domain Restaurant
   */
  findByOwner(ownerId: UuidVO): Promise<Restaurant[]>

  /**
   * Finds a Restaurant by slug
   * @param slug Restaurant slug
   * @returns Domain Restaurant
   */
  findBySlug(slug: SlugVO): Promise<Restaurant | null>
}
