import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
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

  const RestaurantService = new InMemoryRestaurantService()
  const CategoryService = new InMemoryCategoryService()

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
