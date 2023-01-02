import { Banner } from '@client/application/components/atoms/Banner'
import { DishCard } from '@client/application/components/atoms/DishCard'
import { Navbar } from '@client/application/components/molecules/Navbar'
import { ListOfDishesPageGSSP } from '@server/application/gssp/list-of-dishes-page.gssp'
import { noRequireAuth } from '@server/infrastructure/gssp/no-require-auth'
import { Dish } from '@shared/domain/entities/dish'
import Head from 'next/head'

export type ListOfDishesPageProps = {
  restaurantTitle: string
  restaurantSlug: string
  categoryTitle: string
  categoryId: string
  categoryImage: string
  dishes: Dish[]
}

export default function ListOfDishesPage({
  restaurantTitle,
  restaurantSlug,
  categoryTitle,
  categoryId,
  categoryImage,
  dishes,
}: ListOfDishesPageProps) {
  return (
    <>
      <Head>
        <title>
          {restaurantTitle} - {categoryTitle} | Check my menu
        </title>
      </Head>
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

export const getServerSideProps = noRequireAuth<ListOfDishesPageProps>(ListOfDishesPageGSSP)
