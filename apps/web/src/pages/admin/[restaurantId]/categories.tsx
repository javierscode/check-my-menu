import { AdminAside } from '@client/application/components/atoms/AdminAside'
import { AdminNavbar } from '@client/application/components/molecules/AdminNavbar'
import { CategoryForm } from '@client/application/components/molecules/CategoryForm'
import { Modal } from '@client/application/components/molecules/Modal'
import { AdminList } from '@client/application/components/organism/AdminList'
import { deleteCategory } from '@client/infrastructure/api/category/delete-category.fetch'
import { useAdminItemList } from '@client/infrastructure/hooks/use-admin-list'
import { CategoryService } from '@server/domain/services/category.service'
import { RestaurantService } from '@server/domain/services/restaurant.service'
import { requireAuth } from '@server/infrastructure/gssp/require-auth.gssp'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { Category } from '@shared/domain/entities/category'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { pageRedirect404 } from '@shared/infrastructure/constants'

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
export const getServerSideProps = requireAuth<ListOfCategoriesPageProps>(async (context, auth) => {
  const { restaurantId } = context.query

  if (!restaurantId || typeof restaurantId !== 'string') return pageRedirect404

  const CategoryService: CategoryService = new InMemoryCategoryService()
  const RestaurantService: RestaurantService = new InMemoryRestaurantService()

  if (!auth.token) return pageRedirect404

  const restaurant = await RestaurantService.getRestaurantById(auth.token, restaurantId)

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
