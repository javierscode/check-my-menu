import { CategoryService } from '@server/domain/services/category.service'
import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryDishService } from '@server/infrastructure/services/inmemory/inmemory-dish.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { randomIntFromInterval } from '@server/infrastructure/utils/math'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { NextApiRequest, NextApiResponse } from 'next'

import { DishDetailPageProps } from '../[domain]/[categoryId]/[dishId]'

export default async function dishDetailByIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')

  const RestaurantService: RestaurantService = new InMemoryRestaurantService()
  const CategoryService: CategoryService = new InMemoryCategoryService()
  const DishService: DishService = new InMemoryDishService()

  const { domain, categoryId, dishId } = req.query

  if (!domain || typeof domain !== 'string') return res.status(400).send('Missing domain')
  if (!categoryId || typeof categoryId !== 'string')
    return res.status(400).send('Missing categoryId')
  if (!dishId || typeof dishId !== 'string') return res.status(400).send('Missing dishId')

  const restaurant = await RestaurantService.getRestaurantByDomain(domain)
  if (!restaurant) return res.status(404).send('Restaurant not found')

  const dish = await DishService.getDishById(dishId)
  if (!dish) return res.status(404).send('Dish not found')

  const relatedCategories = await Promise.all(
    dish.categoryIds.map(
      async categoryId => (await CategoryService.getCategoryById(categoryId)) as Category
    )
  )

  const draftDishes = (await DishService.getDishesByCategoryId(categoryId)).filter(
    dish => dish.id !== dishId
  )

  const relatedDishes: [Dish, Dish] = [
    draftDishes[randomIntFromInterval(0, draftDishes.length - 1)],
    draftDishes[randomIntFromInterval(0, draftDishes.length - 1)],
  ]

  const props: DishDetailPageProps = {
    restaurantTitle: restaurant.name,
    restaurantSlug: domain,
    previousCategory: categoryId,
    dish,
    relatedCategories,
    relatedDishes: relatedDishes as [Dish, Dish],
  }

  res.status(200).json(props)
}
