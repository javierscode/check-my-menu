import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'

import { fakeRestaurants } from './constants'

export class MockRestaurantService implements RestaurantService {
  async deleteRestaurant(token: string, restaurantId: string): Promise<void> {
    const foundRestaurant = fakeRestaurants.find(r => r.id === restaurantId)
    if (!foundRestaurant) throw new Error('Restaurant not found')
    fakeRestaurants.splice(fakeRestaurants.indexOf(foundRestaurant), 1)
    return await Promise.resolve()
  }

  async editRestaurant(token: string, restaurant: Restaurant): Promise<Restaurant> {
    const foundRestaurant = fakeRestaurants.find(r => r.id === restaurant.id)
    if (!foundRestaurant) throw new Error('Restaurant not found')
    fakeRestaurants.splice(fakeRestaurants.indexOf(foundRestaurant), 1, restaurant)
    return await Promise.resolve(restaurant)
  }

  async createRestaurant(_: string, restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
    const newRestaurant: Restaurant = {
      id: Math.random().toString(36).substr(2, 9),
      ...restaurant,
    }
    await Promise.resolve(fakeRestaurants.push(newRestaurant))
    return newRestaurant
  }

  async getMyRestaurants(_: string): Promise<Restaurant[]> {
    return await Promise.resolve(fakeRestaurants)
  }

  async getRestaurantByDomain(domain: string): Promise<Restaurant | null> {
    return await Promise.resolve(fakeRestaurants.find(r => r.domain === domain) ?? null)
  }
}
