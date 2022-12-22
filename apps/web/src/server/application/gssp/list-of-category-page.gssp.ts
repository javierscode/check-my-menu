import { FetchCategoryService } from '@server/infrastructure/services/fetch/fetch-category.service'
import { FetchRestaurantService } from '@server/infrastructure/services/fetch/fetch-restaurant.service'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ListOfCategoryPageProps } from 'src/pages/[domain]'

export const ListOfCategoryPageGSSP: CustomGetServerSideProps<ListOfCategoryPageProps> = async (
  context: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<ListOfCategoryPageProps & { auth: AuthProps }>> => {
  const { domain } = context.query
  if (!domain || typeof domain !== 'string') return pageRedirect404

  const RestaurantService = new FetchRestaurantService()
  const CategoryService = new FetchCategoryService()

  try {
    const restaurant = await RestaurantService.getRestaurantByDomain(domain)
    if (!restaurant) throw new Error('Restaurant not found')
    const categories = await CategoryService.getCategoriesByRestaurantId(restaurant.id)

    return {
      props: {
        restaurantTitle: restaurant.name,
        restaurantSlug: restaurant.domain,
        categories,
        auth,
      },
    }
  } catch {
    return pageRedirect404
  }
}
