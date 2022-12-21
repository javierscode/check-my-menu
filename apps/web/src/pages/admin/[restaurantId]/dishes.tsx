import { AdminAside } from '@client/application/components/atoms/AdminAside'
import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { DishForm } from '@client/application/components/molecules/DishForm'
import { Modal } from '@client/application/components/molecules/Modal'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteDish } from '@client/infrastructure/api/dish/delete-dish.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
import { DishService } from '@server/domain/services/dish.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { InMemoryDishService } from '@server/infrastructure/services/inmemory/inmemory-dish.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { Dish } from '@shared/domain/entities/dish'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { pageRedirect404 } from '@shared/infrastructure/constants'

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

  const DishesService: DishService = new InMemoryDishService()
  const RestaurantService: RestaurantService = new InMemoryRestaurantService()

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
