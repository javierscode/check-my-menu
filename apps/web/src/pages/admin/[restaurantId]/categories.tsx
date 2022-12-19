import { AdminList } from '@application/components/AdminList'
import { AdminNavbar } from '@application/components/AdminNavbar'
import { CategoryForm } from '@application/components/CategoryForm'
import { Modal } from '@application/components/Modal'
import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'
import { deleteCategory } from '@infrastructure/api/delete-category'
import { pageRedirect404 } from '@infrastructure/constants'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { useAdminItemList } from '@infrastructure/hooks/useAdminItemList'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'

type ListOfCategoriesPageProps = {
  categories: Category[]
  restaurantId: string
}

export default function ListOfCategoriesPage({
  categories: initialCategories,
  restaurantId,
}: ListOfCategoriesPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Category>(initialCategories, deleteCategory, CategoryForm)
  return (
    <>
      <AdminNavbar />
      <AdminList
        title='My Categories'
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
export const getServerSideProps = requireAuth<ListOfCategoriesPageProps>(async (context, auth) => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const CategoryService: CategoryService = new MockCategoryService()

  const categories: Category[] = await CategoryService.getCategoriesByRestaurantId(restaurantId)

  return {
    props: {
      categories,
      restaurantId,
      auth,
    },
  }
})
