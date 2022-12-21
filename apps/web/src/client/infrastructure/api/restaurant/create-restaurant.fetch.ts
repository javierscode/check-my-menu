import { Restaurant } from '@shared/domain/entities/restaurant'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const createRestaurant = ({
  name,
  domain,
  location,
  description,
}: Omit<Restaurant, 'id'>) => {
  return Fetcher.post<{
    restaurant: Restaurant
  }>('/api/admin/create-restaurant', { body: { name, domain, location, description } })
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
