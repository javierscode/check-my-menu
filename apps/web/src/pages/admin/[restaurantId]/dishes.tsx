import { AdminAside } from '@application/components/AdminAside'
import { AdminList } from '@application/components/AdminList'
import { AdminNavbar } from '@application/components/AdminNavbar'
import { DishForm } from '@application/components/DishForm'
import { Modal } from '@application/components/Modal'
import { Dish } from '@domain/entities/dish'
import { Restaurant } from '@domain/entities/restaurant'
import { DishService } from '@domain/services/dish.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { deleteDish } from '@infrastructure/api/delete-dish'
import { pageRedirect404 } from '@infrastructure/constants'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { useAdminItemList } from '@infrastructure/hooks/useAdminItemList'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'

type ListOfDishesPageProps = {
  dishes: Dish[]
  restaurant: Restaurant
}

export default function ListOfDishesPage({
  dishes: InitialDishes,
  restaurant,
}: ListOfDishesPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Dish>(InitialDishes, deleteDish, DishForm)
  return (
    <>
      <AdminNavbar />
      <main className='admin-layout'>
        <AdminAside restaurantName={restaurant.name} restaurantDomain={restaurant.domain} />
        <AdminList
          title='My Dishes'
          items={items}
          buttonTitle='Add new dish'
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </main>
      <Modal closeModal={closeModal}>{showModal && formToRender}</Modal>
    </>
  )
}

export const getServerSideProps = requireAuth<ListOfDishesPageProps>(async (context, auth) => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const DishesService: DishService = new MockDishService()
  const RestaurantService: RestaurantService = new MockRestaurantService()

  if (!auth.token) return pageRedirect404

  const restaurant = await RestaurantService.getRestaurantById(auth.token, restaurantId)

  const dishes: Dish[] = await DishesService.getDishesByRestaurantId(restaurantId, auth.token)

  return {
    props: {
      dishes,
      restaurant,
      auth,
    },
  }
})
