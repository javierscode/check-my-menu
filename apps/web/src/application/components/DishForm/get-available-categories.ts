import { Category } from '@domain/entities/category'
import { Fetcher } from '@infrastructure/services/fetcher'

export function getAvailableCategories(restaurantId: string) {
  return Fetcher.get<{ categories: Category[] }>(
    `/api/get-categories-by-restaurantId?restaurantId=${restaurantId}`
  ).then(({ error, data }) => {
    if (error || !data) {
      return []
    }
    return data.categories
  })
}
