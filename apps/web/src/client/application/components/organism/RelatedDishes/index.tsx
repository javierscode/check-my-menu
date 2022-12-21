import { Dish } from '@shared/domain/entities/dish'

import { DishCard } from '../../atoms/DishCard'
import styles from './RelatedDishes.module.css'

type Props = {
  restaurantSlug: string
  categoryId: string
  relatedDishes: [Dish, Dish]
}

export function RelatedDishes({ restaurantSlug, categoryId, relatedDishes }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>Related Dishes</h3>
      </div>
      <div className={styles.dishes}>
        {relatedDishes.map(dish => (
          <DishCard
            key={dish.id}
            dish={dish}
            href={`/${restaurantSlug}/${categoryId}/${dish.id}`}
          />
        ))}
      </div>
    </div>
  )
}