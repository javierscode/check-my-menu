import { Fetcher } from '@shared/infrastructure/fetcher'

export async function deleteDish(dishId: string): Promise<void> {
  await Fetcher.post('/api/admin/delete-dish', {
    body: {
      id: dishId,
    },
  }).then(({ error }) => {
    if (error) {
      console.error(error)
      throw new Error(error)
    }
  })
}
