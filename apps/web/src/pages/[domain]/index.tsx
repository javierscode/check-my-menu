import { CategoryCard } from '@application/components/CategoryCard'
import { GridList } from '@application/components/GridList'
import { Navbar } from '@application/components/Navbar'
import { Category } from '@domain/entities/category'
import { FRONTEND_URL, pageRedirect404 } from '@infrastructure/constants'
import { noRequireAuth } from '@infrastructure/gssp/no-require-auth'
import { Fetcher } from '@infrastructure/services/fetcher'

export type ListOfCategoryPageProps = {
  restaurantTitle: string
  restaurantSlug: string
  categories: Category[]
}

export default function ListOfCategoryPage({
  restaurantTitle,
  restaurantSlug,
  categories,
}: ListOfCategoryPageProps) {
  return (
    <>
      <Navbar restaurantTitle={restaurantTitle} />
      <main className='container'>
        <GridList gap={1.25}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              href={`/${restaurantSlug}/${category.id}`}
            />
          ))}
        </GridList>
      </main>
    </>
  )
}

export const getServerSideProps = noRequireAuth<ListOfCategoryPageProps>(async (context, auth) => {
  const { domain } = context.query
  if (!domain || typeof domain !== 'string') return pageRedirect404

  try {
    const { data, error } = await Fetcher.get<ListOfCategoryPageProps>(
      `${FRONTEND_URL}/api/list-of-category-by-domain/?domain=${domain}`
    )

    if (error || !data) return pageRedirect404

    return {
      props: {
        ...data,
        auth,
      },
    }
  } catch (error) {
    return pageRedirect404
  }
})
