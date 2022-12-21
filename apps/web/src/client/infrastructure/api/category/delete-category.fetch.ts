import { Fetcher } from '@shared/infrastructure/fetcher'

export async function deleteCategory(categoryId: string): Promise<void> {
  await Fetcher.post('/api/admin/delete-category', {
    body: {
      id: categoryId,
    },
  }).then(({ error }) => {
    if (error) {
      console.error(error)
      throw new Error(error)
    }
  })
}
