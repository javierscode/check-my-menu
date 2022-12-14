import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'

import { Fetcher } from './fetcher'

export class FetchRestaurantService implements RestaurantService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getRestaurantByDomain(domain: string): Promise<Restaurant> {
    return this.fetcher.get<Restaurant>(`/restaurant/?domain=${domain}`)
  }
}
