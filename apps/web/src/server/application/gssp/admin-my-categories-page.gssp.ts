import { CategoryService } from '@server/domain/services/category.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { FetchCategoryService } from '@server/infrastructure/services/fetch/fetch-category.service'
import { FetchRestaurantService } from '@server/infrastructure/services/fetch/fetch-restaurant.service'
import { Category } from '@shared/domain/entities/category'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { AdminMyCategoriesPageProps } from 'src/pages/admin/[restaurantId]/categories'

export const AdminMyCategoriesPageGSSP: CustomGetServerSideProps<
  AdminMyCategoriesPageProps
> = async (
  context: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<AdminMyCategoriesPageProps & { auth: AuthProps }>> => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const CategoryService: CategoryService = new FetchCategoryService()
  const RestaurantService: RestaurantService = new FetchRestaurantService()

  if (!auth.token) return pageRedirect404

  try {
    const restaurant = await RestaurantService.getRestaurantById(auth.token, restaurantId)
    if (!restaurant) throw new Error('Restaurant not found')
    const categories: Category[] = await CategoryService.getCategoriesByRestaurantId(restaurantId)

    return {
      props: {
        categories,
        restaurant,
        auth,
      },
    }
  } catch {
    return pageRedirect404
  }
}
