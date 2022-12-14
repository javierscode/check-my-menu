import { Banner } from '@application/components/Banner'
import { DishCard } from '@application/components/DishCard'
import { GridList } from '@application/components/GridList'
import { Navbar } from '@application/components/Navbar'
import { Dish } from '@domain/entities/dish'
import { CategoryService } from '@domain/services/category.service'
import { DishService } from '@domain/services/dish.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import type { GetServerSideProps } from 'next'

type Props = {
  restaurantTitle: string
  restaurantSlug: string
  categoryTitle: string
  categoryImage: string
  dishes: Dish[]
}

export default function ListOfDishes({
  restaurantTitle,
  restaurantSlug,
  categoryTitle,
  categoryImage,
  dishes,
}: Props) {
  return (
    <>
      <Navbar
        restaurantTitle={restaurantTitle}
        currentLocation={categoryTitle}
        backTo={`/${restaurantSlug}`}
      />
      <main className='container'>
        <Banner src={categoryImage} alt={categoryTitle} />
        <div className='container-sm'>
          {dishes.length > 0 ? (
            dishes.map(dish => (
              <DishCard key={dish.id} dish={dish} href={`/${restaurantSlug}/dish/${dish.id}`} />
            ))
          ) : (
            <p>No dishes found</p>
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const RestaurantService: RestaurantService = new MockRestaurantService()
  const CategoryService: CategoryService = new MockCategoryService()
  const DishService: DishService = new MockDishService()

  const redirect404 = {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }
  const { domain, categoryId } = context.query

  if (!domain || typeof domain !== 'string') return redirect404
  if (!categoryId || typeof categoryId !== 'string') return redirect404

  const restaurant = await RestaurantService.getRestaurantByDomain(domain)
  if (!restaurant) return redirect404

  const category = await CategoryService.getCategoryById(categoryId)
  if (!category) return redirect404

  const dishes = await DishService.getDishesByCategoryId(categoryId)
  if (!dishes) return redirect404

  return {
    props: {
      restaurantTitle: restaurant.name,
      restaurantSlug: domain,
      categoryTitle: category.name,
      categoryImage: category.image,
      dishes,
    },
  }
}
