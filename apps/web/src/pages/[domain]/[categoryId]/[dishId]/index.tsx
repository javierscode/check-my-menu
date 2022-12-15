import { Banner } from '@application/components/Banner'
import { DishDetail } from '@application/components/DishDetail'
import { Navbar } from '@application/components/Navbar'
import { RelatedDishes } from '@application/components/RelatedDishes'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { CategoryService } from '@domain/services/category.service'
import { DishService } from '@domain/services/dish.service'
import { RestaurantService } from '@domain/services/restaurant.service'
import { randomIntFromInterval } from '@infrastructure/utils/math'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import { GetServerSideProps } from 'next'

type Props = {
  restaurantTitle: string
  restaurantSlug: string
  previousCategory: string
  dish: Dish
  relatedCategories: Category[]
  relatedDishes: [Dish, Dish]
}

export default function DishDetailPage({
  restaurantTitle,
  restaurantSlug,
  previousCategory,
  dish,
  relatedCategories,
  relatedDishes,
}: Props) {
  return (
    <>
      <Navbar
        restaurantTitle={restaurantTitle}
        currentLocation={dish.name}
        backTo={`/${restaurantSlug}/${previousCategory}`}
      />
      <main className='container'>
        <Banner src={dish.image} alt={dish.name} />
        <div className='container-sm'>
          <DishDetail
            dish={dish}
            relatedCategories={relatedCategories}
            restaurantSlug={restaurantSlug}
          />
          <RelatedDishes
            relatedDishes={relatedDishes}
            restaurantSlug={restaurantSlug}
            categoryId={previousCategory}
          />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const RestaurantService: RestaurantService = new MockRestaurantService()
  const CategoryService: CategoryService = new MockCategoryService()
  const DishService: DishService = new MockDishService()

  const { domain, categoryId, dishId } = context.query

  const redirect404 = {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }

  if (!domain || typeof domain !== 'string') return redirect404
  if (!categoryId || typeof categoryId !== 'string') return redirect404
  if (!dishId || typeof dishId !== 'string') return redirect404

  const restaurant = await RestaurantService.getRestaurantByDomain(domain)
  if (!restaurant) return redirect404

  const dish = await DishService.getDishById(dishId)
  if (!dish) return redirect404

  const relatedCategories = await Promise.all(
    dish.categoryIds.map(
      async categoryId => (await CategoryService.getCategoryById(categoryId)) as Category
    )
  )

  const draftDishes = (await DishService.getDishesByCategoryId(categoryId)).filter(
    dish => dish.id !== dishId
  )

  const relatedDishes: [Dish, Dish] = [
    draftDishes[randomIntFromInterval(0, draftDishes.length - 1)],
    draftDishes[randomIntFromInterval(0, draftDishes.length - 1)],
  ]

  return {
    props: {
      restaurantTitle: 'Restaurant Title',
      restaurantSlug: domain,
      previousCategory: categoryId,
      dish,
      relatedCategories,
      relatedDishes: relatedDishes as [Dish, Dish],
    },
  }
}
