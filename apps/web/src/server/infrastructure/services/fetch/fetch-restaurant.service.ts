import { RestaurantService } from '@server/domain/services/restaurant.service'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { Fetcher } from '@shared/infrastructure/fetcher'

export class FetchRestaurantService implements RestaurantService {
  private fetcher: typeof Fetcher
  constructor() {
    this.fetcher = Fetcher
  }

  getRestaurantByDomain(domain: string): Promise<Restaurant | null> {
    throw new Error('Method not implemented.')
  }

  getRestaurantById(token: string, id: string): Promise<Restaurant | null> {
    throw new Error('Method not implemented.')
  }

  getMyRestaurants(token: string): Promise<Restaurant[]> {
    throw new Error('Method not implemented.')
  }

  createRestaurant(token: string, restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
    throw new Error('Method not implemented.')
  }

  editRestaurant(token: string, restaurant: Restaurant): Promise<Restaurant> {
    throw new Error('Method not implemented.')
  }

  deleteRestaurant(token: string, restaurantId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
