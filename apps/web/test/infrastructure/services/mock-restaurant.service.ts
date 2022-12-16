import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'

import { fakeRestaurants } from './constants'

export class MockRestaurantService implements RestaurantService {
  async getMyRestaurants(_: string): Promise<Restaurant[]> {
    return await Promise.resolve(fakeRestaurants)
  }

  async getRestaurantByDomain(domain: string): Promise<Restaurant | null> {
    return await Promise.resolve(fakeRestaurants.find(r => r.domain === domain) ?? null)
  }
}
