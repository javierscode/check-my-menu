import { Restaurant } from '@shared/domain/entities/restaurant'

export interface RestaurantService {
  getRestaurantByDomain(domain: string): Promise<Restaurant | null>
  getRestaurantById(token: string, id: string): Promise<Restaurant | null>
  getMyRestaurants(token: string): Promise<Restaurant[]>
  createRestaurant(token: string, restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant>
  editRestaurant(token: string, restaurant: Restaurant): Promise<Restaurant>
  deleteRestaurant(token: string, restaurantId: string): Promise<void>
}
