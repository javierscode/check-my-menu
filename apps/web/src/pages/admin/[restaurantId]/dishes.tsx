import { AdminAside } from '@client/components/atoms/AdminAside'
import { AdminNavbar } from '@client/components/molecules/AdminNavbar'
import { DishForm } from '@client/components/molecules/DishForm'
import { Modal } from '@client/components/molecules/Modal'
import { AdminList } from '@client/components/organism/AdminList'
import { useAdminItemList } from '@client/hooks/use-admin-list'
import { deleteDish } from '@client/services/dish/delete-dish.fetch'
import { AdminMyDishesPageGSSP } from '@server/application/gssp/admin-my-dishes-page.gssp'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { Dish } from '@shared/domain/entities/dish'
import { Restaurant } from '@shared/domain/entities/restaurant'
import Head from 'next/head'

export type AdminMyDishesPageProps = {
  dishes: Dish[]
  restaurant: Restaurant
}

export default function AdminMyDishesPage({
  dishes: InitialDishes,
  restaurant,
}: AdminMyDishesPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Dish>(InitialDishes, deleteDish, DishForm)
  return (
    <>
      <Head>
        <title>Dishes of {restaurant.name} | Check my menu</title>
      </Head>
      <AdminNavbar />
      <main className='admin-layout'>
        <AdminAside
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          restaurantDomain={restaurant.domain}
        />
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

export const getServerSideProps = requireAuth<AdminMyDishesPageProps>(AdminMyDishesPageGSSP)
