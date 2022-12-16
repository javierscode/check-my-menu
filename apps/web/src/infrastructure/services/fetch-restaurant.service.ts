import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'
import { BACKEND_URL } from '@infrastructure/constants'

import { Fetcher } from './fetcher'

export class FetchRestaurantService implements RestaurantService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getMyRestaurants(token: string): Promise<Restaurant[]> {
    throw new Error('Method not implemented.')
  }

  getRestaurantByDomain(domain: string): Promise<Restaurant> {
    throw new Error('Method not implemented.')
  }
}
