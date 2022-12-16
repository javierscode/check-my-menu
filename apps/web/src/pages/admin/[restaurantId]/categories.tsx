import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'
import { pageRedirect404 } from '@infrastructure/constants'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireAuth } from '@infrastructure/gssp/require-auth.gssp'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import Link from 'next/link'

type ListOfCategoriesPageProps = {
  categories: Category[]
  restaurantId: string
}

export default function ListOfCategoriesPage({
  categories,
  restaurantId,
}: ListOfCategoriesPageProps) {
  const { token, profile } = useAuthContext()

  return (
    <div>
      <h1>Admin List Of Categories</h1>
      <p>Token: {token}</p>
      <p>Name: {profile?.name}</p>
      <p>Lastname: {profile?.lastname}</p>
      <p>Email: {profile?.email}</p>
      <hr />
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <hr />
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href={`/admin`}>Go back to list of Restaurants</Link>
        <Link href={`/admin/${restaurantId}/dishes`}>Go to Dishes</Link>
      </nav>
    </div>
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
