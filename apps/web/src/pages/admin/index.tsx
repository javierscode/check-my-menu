/* eslint-disable @typescript-eslint/no-empty-function */
import { AdminList } from '@application/components/AdminList'
import { AdminNavbar } from '@application/components/AdminNavbar'
import { Modal } from '@application/components/Modal'
import { RestaurantForm } from '@application/components/RestaurantForm'
import { Restaurant } from '@domain/entities/restaurant'
import { RestaurantService } from '@domain/services/restaurant.service'
import { deleteRestaurant } from '@infrastructure/api/delete-restaurant'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { useAdminItemList } from '@infrastructure/hooks/useAdminItemList'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'

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
