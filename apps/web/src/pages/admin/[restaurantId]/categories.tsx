import { AdminAside } from '@application/components/AdminAside'
import { AdminList } from '@application/components/AdminList'
import { AdminNavbar } from '@application/components/AdminNavbar'
import { CategoryForm } from '@application/components/CategoryForm'
import { Modal } from '@application/components/Modal'
import { Category } from '@domain/entities/category'
import { Restaurant } from '@domain/entities/restaurant'
import { CategoryService } from '@domain/services/category.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { deleteCategory } from '@infrastructure/api/delete-category'
import { pageRedirect404 } from '@infrastructure/constants'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { useAdminItemList } from '@infrastructure/hooks/useAdminItemList'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'

type ListOfCategoriesPageProps = {
  categories: Category[]
  restaurant: Restaurant
}

export default function ListOfCategoriesPage({
  categories: initialCategories,
  restaurant,
}: ListOfCategoriesPageProps) {
  const { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender } =
    useAdminItemList<Category>(initialCategories, deleteCategory, CategoryForm)
  return (
    <>
      <AdminNavbar />
      <main className='admin-layout'>
        <AdminAside restaurantName={restaurant.name} restaurantDomain={restaurant.domain} />
        <AdminList
          title='My Categories'
          items={items}
          buttonTitle='Add new restaurant'
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </main>
      <Modal closeModal={closeModal}>{showModal && formToRender}</Modal>
    </>
  )
}
export const getServerSideProps = requireAuth<ListOfCategoriesPageProps>(async (context, auth) => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const CategoryService: CategoryService = new MockCategoryService()
  const RestaurantService: RestaurantService = new MockRestaurantService()

  const restaurant = await RestaurantService.getRestaurantById(restaurantId)

  if (!restaurant) return pageRedirect404

  const categories: Category[] = await CategoryService.getCategoriesByRestaurantId(restaurantId)

  return {
    props: {
      categories,
      restaurant,
      auth,
    },
  }
})
