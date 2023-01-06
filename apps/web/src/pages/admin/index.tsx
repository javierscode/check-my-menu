import { AdminNavbar } from '@client/components/molecules/AdminNavbar'
import { Modal } from '@client/components/molecules/Modal'
import { RestaurantForm } from '@client/components/molecules/RestaurantForm'
import { AdminList } from '@client/components/organism/AdminList'
import { useAdminItemList } from '@client/hooks/use-admin-list'
import { deleteRestaurant } from '@client/services/restaurant/delete-restaurant.fetch'
import { AdminMyRestaurantsPageGSSP } from '@server/application/gssp/admin-my-restaurants-page.gssp'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { Restaurant } from '@shared/domain/entities/restaurant'
import Head from 'next/head'

export type AdminMyRestaurantsPageProps = {
  restaurants: Restaurant[]
}

export default function AdminMyRestaurantsPage({
  restaurants: initialRestaurants,
}: AdminMyRestaurantsPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Restaurant>(initialRestaurants, deleteRestaurant, RestaurantForm)

  return (
    <>
      <Head>
        <title>My restaurants | Check my menu</title>
      </Head>
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

export const getServerSideProps = requireAuth<AdminMyRestaurantsPageProps>(
  AdminMyRestaurantsPageGSSP
)
