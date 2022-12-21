import { AdminAside } from '@client/application/components/atoms/AdminAside'
import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { DishForm } from '@client/application/components/molecules/DishForm'
import { Modal } from '@client/application/components/molecules/Modal'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteDish } from '@client/infrastructure/api/dish/delete-dish.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
import { AdminMyDishesPageGSSP } from '@server/application/gssp/admin-my-dishes-page.gssp'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { Dish } from '@shared/domain/entities/dish'
import { Restaurant } from '@shared/domain/entities/restaurant'

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

export const getServerSideProps = requireAuth<AdminMyDishesPageProps>(AdminMyDishesPageGSSP)
