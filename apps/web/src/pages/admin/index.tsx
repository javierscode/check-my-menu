import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { Modal } from '@client/application/components/molecules/Modal'
import { RestaurantForm } from '@client/application/components/molecules/RestaurantForm'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteRestaurant } from '@client/infrastructure/api/restaurant/delete-restaurant.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
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
