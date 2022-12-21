import { Category } from '@shared/domain/entities/category'
import { Fetcher } from '@shared/infrastructure/fetcher'

export const editCategory = (category: Category) => {
  return Fetcher.post<{
    category: Category
  }>('/api/admin/edit-category', { body: { ...category } })
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
