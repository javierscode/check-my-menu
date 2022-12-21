import { Category } from '@shared/domain/entities/category'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const createCategory = ({
  name,
  description,
  image,
  restaurantId,
}: Omit<Category, 'id'>) => {
  return Fetcher.post<{
    category: Category
  }>('/api/admin/create-category', { body: { name, description, image, restaurantId } })
    .then(({ error, data }) => {
      if (error || !data) {
        console.error(error)
        return undefined
      }
      const { category } = data
      return category
    })
    .catch(error => {
      console.error(error)
      return undefined
    })
}
