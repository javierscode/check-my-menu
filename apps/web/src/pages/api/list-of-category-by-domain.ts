import { CategoryService } from '@server/domain/services/category.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { NextApiRequest, NextApiResponse } from 'next'

import { ListOfCategoryPageProps } from '../[domain]'

export default async function listOfCategoryByDomainHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')

  const RestaurantService: RestaurantService = new InMemoryRestaurantService()
  const CategoryService: CategoryService = new InMemoryCategoryService()

  const { domain } = req.query

  if (!domain || typeof domain !== 'string') return res.status(400).send('Missing domain')

  const restaurant = await RestaurantService.getRestaurantByDomain(domain)
  if (!restaurant) return res.status(404).send('Restaurant not found')

  const categories = await CategoryService.getCategoriesByRestaurantId(restaurant.id)

  const props: ListOfCategoryPageProps = {
    restaurantTitle: restaurant.name,
    restaurantSlug: domain,
    categories,
  }
  res.status(200).json(props)
}
