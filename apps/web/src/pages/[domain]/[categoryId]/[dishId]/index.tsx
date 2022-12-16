import { Banner } from '@application/components/Banner'
import { DishDetail } from '@application/components/DishDetail'
import { Navbar } from '@application/components/Navbar'
import { RelatedDishes } from '@application/components/RelatedDishes'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { FRONTEND_URL, pageRedirect404 } from '@infrastructure/constants'
import { noRequireAuth } from '@infrastructure/gssp/no-require-auth'
import { Fetcher } from '@infrastructure/services/fetcher'

export type DishDetailPageProps = {
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
}: DishDetailPageProps) {
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

export const getServerSideProps = noRequireAuth(async (context, auth) => {
  const { domain, categoryId, dishId } = context.query

  if (!domain || typeof domain !== 'string') return pageRedirect404
  if (!categoryId || typeof categoryId !== 'string') return pageRedirect404
  if (!dishId || typeof dishId !== 'string') return pageRedirect404

  try {
    const { data, error } = await Fetcher.get<DishDetailPageProps>(
      `${FRONTEND_URL}/api/dish-detail-by-id/?domain=${domain}&categoryId=${categoryId}&dishId=${dishId}`
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
