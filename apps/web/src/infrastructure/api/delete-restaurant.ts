import { Fetcher } from '@infrastructure/services/fetcher'

export async function deleteRestaurant(restaurantId: string): Promise<void> {
  await Fetcher.post('/api/admin/delete-restaurant', {
    body: {
      id: restaurantId,
    },
  }).then(({ error }) => {
    if (error) {
      console.error(error)
      throw new Error(error)
    }
  })
}
