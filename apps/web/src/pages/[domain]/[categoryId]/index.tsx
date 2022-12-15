import { Banner } from '@application/components/Banner'
import { DishCard } from '@application/components/DishCard'
import { Navbar } from '@application/components/Navbar'
import { Dish } from '@domain/entities/dish'
import { FRONTEND_URL, pageRedirect404 } from '@infrastructure/constants'
import { Fetcher } from '@infrastructure/services/fetcher'
import type { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps<ListOfDishesPageProps> = async context => {
  const { domain, categoryId } = context.query

  if (!domain || typeof domain !== 'string') return pageRedirect404
  if (!categoryId || typeof categoryId !== 'string') return pageRedirect404

  try {
    const props = await Fetcher.get<ListOfDishesPageProps>(
      `${FRONTEND_URL}/api/list-of-dishes-by-category/?domain=${domain}&categoryId=${categoryId}`
    )
    return {
      props,
    }
  } catch (error) {
    return pageRedirect404
  }
}
