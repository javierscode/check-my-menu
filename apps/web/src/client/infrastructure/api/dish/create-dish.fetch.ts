import { Dish } from '@shared/domain/entities/dish'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const createDish = ({
  name,
  description,
  price,
  image,
  allergens,
  categoryIds,
  restaurantId,
}: Omit<Dish, 'id'>) => {
  return Fetcher.post<{
    dish: Dish
  }>('/api/admin/dish/create-dish', {
    body: { name, description, price, image, allergens, categoryIds, restaurantId },
  })
    .then(({ error, data }) => {
      if (error || !data) {
        console.error(error)
        return undefined
      }
      const { dish } = data
      return dish
    })
    .catch(error => {
      console.error(error)
      return undefined
    })
}
