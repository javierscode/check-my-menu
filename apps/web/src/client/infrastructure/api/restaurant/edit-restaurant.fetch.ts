import { Restaurant } from '@shared/domain/entities/restaurant'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const editRestaurant = (restaurant: Restaurant) => {
  return Fetcher.post<{
    restaurant: Restaurant
  }>('/api/admin/edit-restaurant', { body: { ...restaurant } })
    .then(({ error, data }) => {
      if (error || !data) {
        console.error(error)
        return undefined
      }
      const { restaurant } = data
      return restaurant
    })
    .catch(error => {
      console.error(error)
      return undefined
    })
}
