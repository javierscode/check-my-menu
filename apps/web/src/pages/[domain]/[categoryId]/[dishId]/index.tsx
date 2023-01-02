import { Banner } from '@client/application/components/atoms/Banner'
import { DishDetail } from '@client/application/components/molecules/DishDetail'
import { Navbar } from '@client/application/components/molecules/Navbar'
import { RelatedDishes } from '@client/application/components/organism/RelatedDishes'
import { DishDetailPageGSSP } from '@server/application/gssp/dish-detail-page.gssp'
import { noRequireAuth } from '@server/infrastructure/gssp/no-require-auth'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import Head from 'next/head'

export type DishDetailPageProps = {
  restaurantTitle: string
  restaurantSlug: string
  previousCategory: string
  dish: Dish
  relatedCategories: Category[]
  relatedDishes: Dish[]
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
      <Head>
        <title>
          {restaurantTitle} - {dish.name} | Check my menu
        </title>
      </Head>
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
          {relatedDishes.length > 0 && (
            <RelatedDishes
              relatedDishes={relatedDishes}
              restaurantSlug={restaurantSlug}
              categoryId={previousCategory}
            />
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = noRequireAuth<DishDetailPageProps>(DishDetailPageGSSP)
