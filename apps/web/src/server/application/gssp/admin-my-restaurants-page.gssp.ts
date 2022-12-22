import { RestaurantService } from '@server/domain/services/restaurant.service'
import { FetchRestaurantService } from '@server/infrastructure/services/fetch/fetch-restaurant.service'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { AdminMyRestaurantsPageProps } from 'src/pages/admin'

export const AdminMyRestaurantsPageGSSP: CustomGetServerSideProps<
  AdminMyRestaurantsPageProps
> = async (
  _: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<AdminMyRestaurantsPageProps & { auth: AuthProps }>> => {
  const RestaurantService: RestaurantService = new FetchRestaurantService()

  try {
    const restaurants: Restaurant[] = await RestaurantService.getMyRestaurants(auth.token as string)

    return {
      props: {
        restaurants,
        auth,
      },
    }
  } catch {
    return pageRedirect404
  }
}
