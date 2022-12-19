/* eslint-disable @typescript-eslint/no-empty-function */
import { AdminList } from '@application/components/AdminList'
import { AdminNavbar } from '@application/components/AdminNavbar'
import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'

export type ListOfRestaurantsPageProps = {
  restaurants: Restaurant[]
}

export default function ListOfRestaurantsPage({ restaurants }: ListOfRestaurantsPageProps) {
  return (
    <>
      <AdminNavbar />
      <AdminList
        title='My Restaurants'
        items={restaurants}
        buttonTitle='Add new restaurant'
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  )
}

export const getServerSideProps = requireAuth<ListOfRestaurantsPageProps>(async (context, auth) => {
  const RestaurantService: RestaurantService = new MockRestaurantService()

  try {
    const restaurants: Restaurant[] = await RestaurantService.getMyRestaurants(auth.token as string)

    return {
      props: {
        restaurants,
        auth,
      },
    }
  } catch (error) {
    return {
      props: {
        restaurants: [],
        auth,
      },
    }
  }
})
