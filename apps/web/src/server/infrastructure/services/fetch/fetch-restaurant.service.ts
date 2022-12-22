import { RestaurantService } from '@server/domain/services/restaurant.service'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { BACKEND_URL } from '@shared/infrastructure/constants'
import { Fetcher } from '@shared/infrastructure/fetcher'
import uuid from 'uuid-random'

export class FetchRestaurantService implements RestaurantService {
  async getRestaurantByDomain(domain: string): Promise<Restaurant | null> {
    const { error, data } = await Fetcher.get<Restaurant>(
      BACKEND_URL + `/restaurant/domain/${domain}`
    )
    if (error || !data) throw new Error('Error fetching restaurant')
    return data
  }

  async getRestaurantById(token: string, id: string): Promise<Restaurant | null> {
    const { error, data } = await Fetcher.get<Restaurant>(BACKEND_URL + `/restaurant/${id}`, {
      authToken: token,
    })
    if (error || !data) throw new Error('Error fetching restaurant')
    return data
  }

  async getMyRestaurants(token: string): Promise<Restaurant[]> {
    const { error, data } = await Fetcher.get<Restaurant[]>(BACKEND_URL + `/restaurant/`, {
      authToken: token,
    })
    if (error || !data) throw new Error('Error fetching restaurants')
    return data
  }

  async createRestaurant(token: string, restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
    const newRestaurant: Restaurant = {
      ...restaurant,
      id: uuid(),
    }
    const { error } = await Fetcher.post<void>(BACKEND_URL + `/restaurant/`, {
      body: newRestaurant,
      authToken: token,
    })

    if (error) throw new Error('Error creating restaurant')
    return newRestaurant
  }

  async editRestaurant(token: string, restaurant: Restaurant): Promise<Restaurant> {
    const { error } = await Fetcher.put<void>(BACKEND_URL + `/restaurant/`, {
      body: restaurant,
      authToken: token,
    })
    if (error) throw new Error('Error editing restaurant')
    return restaurant
  }

  async deleteRestaurant(token: string, restaurantId: string): Promise<void> {
    const { error } = await Fetcher.delete<void>(BACKEND_URL + `/restaurant/${restaurantId}`, {
      authToken: token,
    })
    if (error) throw new Error('Error deleting restaurant')
  }
}
