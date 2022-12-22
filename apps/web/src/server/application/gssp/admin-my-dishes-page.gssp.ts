import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { FetchDishService } from '@server/infrastructure/services/fetch/fetch-dish.service'
import { FetchRestaurantService } from '@server/infrastructure/services/fetch/fetch-restaurant.service'
import { Dish } from '@shared/domain/entities/dish'
import { pageRedirect404 } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { AdminMyDishesPageProps } from 'src/pages/admin/[restaurantId]/dishes'

export const AdminMyDishesPageGSSP: CustomGetServerSideProps<AdminMyDishesPageProps> = async (
  context: GetServerSidePropsContext,
  auth: AuthProps
): Promise<GetServerSidePropsResult<AdminMyDishesPageProps & { auth: AuthProps }>> => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const DishesService: DishService = new FetchDishService()
  const RestaurantService: RestaurantService = new FetchRestaurantService()

  if (!auth.token) return pageRedirect404

  try {
    const restaurant = await RestaurantService.getRestaurantById(auth.token, restaurantId)
    if (!restaurant) throw new Error('Restaurant not found')
    const dishes: Dish[] = await DishesService.getDishesByRestaurantId(restaurantId, auth.token)

    return {
      props: {
        dishes,
        restaurant,
        auth,
      },
    }
  } catch {
    return pageRedirect404
  }
}
