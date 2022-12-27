import { AdminAside } from '@client/application/components/atoms/AdminAside'
import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { CategoryForm } from '@client/application/components/molecules/CategoryForm'
import { Modal } from '@client/application/components/molecules/Modal'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteCategory } from '@client/infrastructure/api/category/delete-category.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
import { AdminMyCategoriesPageGSSP } from '@server/application/gssp/admin-my-categories-page.gssp'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { Category } from '@shared/domain/entities/category'
import { Restaurant } from '@shared/domain/entities/restaurant'

export type AdminMyCategoriesPageProps = {
  categories: Category[]
  restaurant: Restaurant
}

export default function AdminMyCategoriesPage({
  categories: initialCategories,
  restaurant,
}: AdminMyCategoriesPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Category>(initialCategories, deleteCategory, CategoryForm)
  return (
    <>
      <AdminNavbar />
      <main className='admin-layout'>
        <AdminAside
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          restaurantDomain={restaurant.domain}
        />
        <AdminList
          title='My Categories'
          items={items}
          buttonTitle='Add new category'
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </main>
      <Modal closeModal={closeModal}>{showModal && formToRender}</Modal>
    </>
  )
}
export const getServerSideProps = requireAuth<AdminMyCategoriesPageProps>(AdminMyCategoriesPageGSSP)
