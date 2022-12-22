import { CategoryService } from '@server/domain/services/category.service'
import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { FetchCategoryService } from '@server/infrastructure/services/fetch/fetch-category.service'
import { FetchDishService } from '@server/infrastructure/services/fetch/fetch-dish.service'
import { FetchRestaurantService } from '@server/infrastructure/services/fetch/fetch-restaurant.service'
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

  const RestaurantService: RestaurantService = new FetchRestaurantService()
  const CategoryService: CategoryService = new FetchCategoryService()
  const DishService: DishService = new FetchDishService()

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

    const relatedDishes: Dish[] = []

    for (let i = 0; i < draftDishes.length && i < 2; i++) {
      const randomDish = draftDishes[randomIntFromInterval(0, draftDishes.length - 1)]
      draftDishes.splice(draftDishes.indexOf(randomDish), 1)
      relatedDishes.push(randomDish)
    }

    const props: DishDetailPageProps = {
      restaurantTitle: restaurant.name,
      restaurantSlug: domain,
      previousCategory: categoryId,
      dish,
      relatedCategories,
      relatedDishes,
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
