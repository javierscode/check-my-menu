import { Banner } from '@client/application/components/atoms/Banner'
import { DishCard } from '@client/application/components/atoms/DishCard'
import { Navbar } from '@client/application/components/molecules/Navbar'
import { noRequireAuth } from '@server/infrastructure/gssp/no-require-auth'
import { Dish } from '@shared/domain/entities/dish'
import { FRONTEND_URL, pageRedirect404 } from '@shared/infrastructure/constants'
import { Fetcher } from '@shared/infrastructure/fetcher'

export type ListOfDishesPageProps = {
  restaurantTitle: string
  restaurantSlug: string
  categoryTitle: string
  categoryId: string
  categoryImage: string
  dishes: Dish[]
}

export default function ListOfDishes({
  restaurantTitle,
  restaurantSlug,
  categoryTitle,
  categoryId,
  categoryImage,
  dishes,
}: ListOfDishesPageProps) {
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
              <DishCard
                key={dish.id}
                dish={dish}
                href={`/${restaurantSlug}/${categoryId}/${dish.id}`}
              />
            ))
          ) : (
            <p>No dishes found</p>
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = noRequireAuth<ListOfDishesPageProps>(async (context, auth) => {
  const { domain, categoryId } = context.query

  if (!domain || typeof domain !== 'string') return pageRedirect404
  if (!categoryId || typeof categoryId !== 'string') return pageRedirect404

  try {
    const { data, error } = await Fetcher.get<ListOfDishesPageProps>(
      `${FRONTEND_URL}/api/list-of-dishes-by-category/?domain=${domain}&categoryId=${categoryId}`
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
