import { Dish } from '@shared/domain/entities/dish'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const editDish = (dish: Dish) => {
  return Fetcher.post<{
    dish: Dish
  }>('/api/admin/dish/edit-dish', { body: { ...dish } })
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
