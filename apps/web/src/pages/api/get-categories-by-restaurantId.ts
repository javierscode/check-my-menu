import { CategoryService } from '@server/domain/services/category.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed')
  }

  const { restaurantId } = req.query

  if (!restaurantId || typeof restaurantId === 'object') {
    return res.status(400).send('Missing restaurantId')
  }

  const CategoryService: CategoryService = new InMemoryCategoryService()

  try {
    const categories = await CategoryService.getCategoriesByRestaurantId(restaurantId)

    res.status(200).json({ categories })
  } catch (error) {
    res.status(500).end()
  }
}
