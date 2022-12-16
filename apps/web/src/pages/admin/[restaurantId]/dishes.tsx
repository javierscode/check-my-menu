import { Dish } from '@domain/entities/dish'
import { DishService } from '@domain/services/dish.service'
import { pageRedirect404 } from '@infrastructure/constants'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import Link from 'next/link'

type ListOfDishesPageProps = {
  dishes: Dish[]
  restaurantId: string
}

export default function ListOfDishesPage({ dishes, restaurantId }: ListOfDishesPageProps) {
  const { token, profile } = useAuthContext()

  return (
    <div>
      <h1>Admin List Of Dishes</h1>
      <p>Token: {token}</p>
      <p>Name: {profile?.name}</p>
      <p>Lastname: {profile?.lastname}</p>
      <p>Email: {profile?.email}</p>
      <hr />
      <ul>
        {dishes.map(dish => (
          <li key={dish.id}>{dish.name}</li>
        ))}
      </ul>
      <hr />
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href={`/admin`}>Go back to list of Restaurants</Link>
        <Link href={`/admin/${restaurantId}/categories`}>Go to Categories</Link>
      </nav>
    </div>
  )
}

export const getServerSideProps = requireAuth<ListOfDishesPageProps>(async (context, auth) => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const DishesService: DishService = new MockDishService()

  const dishes: Dish[] = await DishesService.getDishesByRestaurantId(
    restaurantId,
    auth.token as string
  )

  return {
    props: {
      dishes,
      restaurantId,
      auth,
    },
  }
})
