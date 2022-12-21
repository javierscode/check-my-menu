import { CategoryCard } from '@client/application/components/atoms/CategoryCard'
import { GridList } from '@client/application/components/atoms/GridList'
import { Navbar } from '@client/application/components/molecules/Navbar'
import { ListOfCategoryPageGSSP } from '@server/application/gssp/list-of-category-page.gssp'
import { noRequireAuth } from '@server/infrastructure/gssp/no-require-auth'
import { Category } from '@shared/domain/entities/category'

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

export const getServerSideProps = noRequireAuth<ListOfCategoryPageProps>(ListOfCategoryPageGSSP)
