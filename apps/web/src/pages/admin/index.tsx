import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { Modal } from '@client/application/components/molecules/Modal'
import { RestaurantForm } from '@client/application/components/molecules/RestaurantForm'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteRestaurant } from '@client/infrastructure/api/restaurant/delete-restaurant.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { Restaurant } from '@shared/domain/entities/restaurant'

export type ListOfRestaurantsPageProps = {
  restaurants: Restaurant[]
}

export default function ListOfRestaurantsPage({
  restaurants: initialRestaurants,
}: ListOfRestaurantsPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Restaurant>(initialRestaurants, deleteRestaurant, RestaurantForm)

  return (
    <>
      <AdminNavbar />
      <AdminList
        title='My Restaurants'
        items={items}
        buttonTitle='Add new restaurant'
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Modal closeModal={closeModal}>{showModal && formToRender}</Modal>
    </>
  )
}

export const getServerSideProps = requireAuth<ListOfRestaurantsPageProps>(async (context, auth) => {
  const RestaurantService: RestaurantService = new InMemoryRestaurantService()

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
