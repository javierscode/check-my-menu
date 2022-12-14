import { Restaurant } from '@domain/entities/restaurant'

export interface RestaurantService {
  getRestaurantByDomain(domain: string): Promise<Restaurant | null>
}