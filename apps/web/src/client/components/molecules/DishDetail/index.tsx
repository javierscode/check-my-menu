import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'

import { AllergenBullet } from '../../atoms/AllergenBullet'
import { CategoryLabel } from '../../atoms/CategoryLabel'
import styles from './DishDetail.module.css'

export type DishDetailProps = {
  dish: Dish
  restaurantSlug: string
  relatedCategories: Category[]
}

export function DishDetail({ dish, restaurantSlug, relatedCategories }: DishDetailProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <div className={styles.title}>
          <h3>{dish.name}</h3>
        </div>
        <div className={styles.categories}>
          {relatedCategories.map(category => (
            <CategoryLabel
              key={category.id}
              categoryName={category.name}
              href={`/${restaurantSlug}/${category.id}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <p>{dish.description}</p>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <h4>Allergens</h4>
          <div className={styles.allergens}>
            {dish.allergens.map((allergen, index) => (
              <AllergenBullet key={index} allergen={allergen} />
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <p className={styles.price}>{dish.price}€</p>
        </div>
      </div>
    </div>
  )
}
