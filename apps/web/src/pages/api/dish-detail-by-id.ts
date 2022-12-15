import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { CategoryService } from '@domain/services/category.service'
import { DishService } from '@domain/services/dish.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { randomIntFromInterval } from '@infrastructure/utils/math'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import { NextApiRequest, NextApiResponse } from 'next'

import { DishDetailPageProps } from '../[domain]/[categoryId]/[dishId]'

export default async function dishDetailByIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')

  const RestaurantService: RestaurantService = new MockRestaurantService()
  const CategoryService: CategoryService = new MockCategoryService()
  const DishService: DishService = new MockDishService()

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
