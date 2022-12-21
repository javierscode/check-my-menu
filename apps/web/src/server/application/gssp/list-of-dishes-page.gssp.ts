import { CategoryService } from '@server/domain/services/category.service'
import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryDishService } from '@server/infrastructure/services/inmemory/inmemory-dish.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ListOfDishesPageProps } from 'src/pages/[domain]/[categoryId]'

export const ListOfDishesPageGSSP: CustomGetServerSideProps<ListOfDishesPageProps> = async (
  context: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<ListOfDishesPageProps & { auth: AuthProps }>> => {
  const { domain, categoryId } = context.query

  if (!domain || typeof domain !== 'string') return pageRedirect404
  if (!categoryId || typeof categoryId !== 'string') return pageRedirect404

  const RestaurantService: RestaurantService = new InMemoryRestaurantService()
  const CategoryService: CategoryService = new InMemoryCategoryService()
  const DishService: DishService = new InMemoryDishService()

  try {
    const restaurant = await RestaurantService.getRestaurantByDomain(domain)
    if (!restaurant) throw new Error('Restaurant not found')

    const category = await CategoryService.getCategoryById(categoryId)
    if (!category) throw new Error('Category not found')

    const dishes = await DishService.getDishesByCategoryId(categoryId)
    if (!dishes) throw new Error('Dishes not found')

    const props: ListOfDishesPageProps = {
      restaurantTitle: restaurant.name,
      restaurantSlug: restaurant.domain,
      categoryTitle: category.name,
      categoryId: category.id,
      categoryImage: category.image,
      dishes,
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
