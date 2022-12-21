import { CategoryService } from '@server/domain/services/category.service'
import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryDishService } from '@server/infrastructure/services/inmemory/inmemory-dish.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { randomIntFromInterval } from '@server/infrastructure/utils/math'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { DishDetailPageProps } from 'src/pages/[domain]/[categoryId]/[dishId]'

export const DishDetailPageGSSP: CustomGetServerSideProps<DishDetailPageProps> = async (
  context: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<DishDetailPageProps & { auth: AuthProps }>> => {
  const { domain, categoryId, dishId } = context.query

  if (!domain || typeof domain !== 'string') return pageRedirect404
  if (!categoryId || typeof categoryId !== 'string') return pageRedirect404
  if (!dishId || typeof dishId !== 'string') return pageRedirect404

  const RestaurantService: RestaurantService = new InMemoryRestaurantService()
  const CategoryService: CategoryService = new InMemoryCategoryService()
  const DishService: DishService = new InMemoryDishService()

  try {
    const restaurant = await RestaurantService.getRestaurantByDomain(domain)
    if (!restaurant) throw new Error('Restaurant not found')

    const dish = await DishService.getDishById(dishId)
    if (!dish) throw new Error('Dish not found')

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

    return {
      props: {
        ...props,
        auth,
      },
    }
  } catch {
    return pageRedirect404
  }
}
