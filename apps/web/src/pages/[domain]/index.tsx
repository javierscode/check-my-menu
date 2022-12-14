import { CategoryCard } from '@application/components/CategoryCard'
import { GridList } from '@application/components/GridList'
import { Navbar } from '@application/components/Navbar'
import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import type { GetServerSideProps } from 'next'

type Props = {
  restaurantTitle: string
  restaurantSlug: string
  categories: Category[]
}

export default function LisOfCategoryPage({ restaurantTitle, restaurantSlug, categories }: Props) {
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

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const RestaurantService: RestaurantService = new MockRestaurantService()
  const CategoryService: CategoryService = new MockCategoryService()
  const redirect404 = {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }

  const { domain } = context.query

  if (!domain || typeof domain !== 'string') return redirect404
  const restaurant = await RestaurantService.getRestaurantByDomain(domain)

  if (!restaurant) return redirect404
  const categories = await CategoryService.getCategoriesByRestaurantId(restaurant.id)

  return {
    props: {
      restaurantTitle: restaurant.name,
      restaurantSlug: domain,
      categories,
    },
  }
}
