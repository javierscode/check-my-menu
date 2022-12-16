import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import Link from 'next/link'

export type ListOfRestaurantsPageProps = {
  restaurants: Restaurant[]
}

export default function ListOfRestaurantsPage({ restaurants }: ListOfRestaurantsPageProps) {
  const { token, profile } = useAuthContext()

  return (
    <div>
      <h1>Admin List Of Restaurants</h1>
      <p>Token: {token}</p>
      <p>Name: {profile?.name}</p>
      <p>Lastname: {profile?.lastname}</p>
      <p>Email: {profile?.email}</p>
      <hr />
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <Link href={`/admin/${restaurant.id}/dishes`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
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
