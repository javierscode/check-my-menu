import { AdminAside } from '@client/components/atoms/AdminAside'
import { AdminNavbar } from '@client/components/molecules/AdminNavbar'
import { CategoryForm } from '@client/components/molecules/CategoryForm'
import { Modal } from '@client/components/molecules/Modal'
import { AdminList } from '@client/components/organism/AdminList'
import { useAdminItemList } from '@client/hooks/use-admin-list'
import { deleteCategory } from '@client/services/category/delete-category.fetch'
import { AdminMyCategoriesPageGSSP } from '@server/application/gssp/admin-my-categories-page.gssp'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { Category } from '@shared/domain/entities/category'
import { Restaurant } from '@shared/domain/entities/restaurant'
import Head from 'next/head'

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
      <Head>
        <title>Categories of {restaurant.name} | Check my menu</title>
      </Head>
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
