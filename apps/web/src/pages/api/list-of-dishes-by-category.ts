import { CategoryService } from '@domain/services/category.service'
import { DishService } from '@domain/services/dish.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import { NextApiRequest, NextApiResponse } from 'next'

import { ListOfDishesPageProps } from '../[domain]/[categoryId]'

export default async function listOfDishesByCategoryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')

  const RestaurantService: RestaurantService = new MockRestaurantService()
  const CategoryService: CategoryService = new MockCategoryService()
  const DishService: DishService = new MockDishService()

  const { domain, categoryId } = req.query

  if (!domain || typeof domain !== 'string') return res.status(400).send('Missing domain')
  if (!categoryId || typeof categoryId !== 'string')
    return res.status(400).send('Missing categoryId')

  const restaurant = await RestaurantService.getRestaurantByDomain(domain)
  if (!restaurant) return res.status(404).send('Restaurant not found')

  const category = await CategoryService.getCategoryById(categoryId)
  if (!category) return res.status(404).send('Category not found')

  const dishes = await DishService.getDishesByCategoryId(categoryId)
  if (!dishes) return res.status(404).send('Dishes not found')

  const props: ListOfDishesPageProps = {
    restaurantTitle: restaurant.name,
    restaurantSlug: domain,
    categoryTitle: category.name,
    categoryId: category.id,
    categoryImage: category.image,
    dishes,
  }
  res.status(200).json(props)
}
