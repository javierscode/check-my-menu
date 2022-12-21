import { Dish } from '@shared/domain/entities/dish'
import Image from 'next/image'
import Link from 'next/link'

import styles from './DishCard.module.css'

type Props = {
  dish: Dish
  href: string
}

export function DishCard({ dish, href }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <Image src={dish.image} alt={dish.name} fill />
      </div>
      <div className={styles.content}>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <div className={styles.info}>
          <p>{dish.price}€</p>
          <Link href={href}>More info</Link>
        </div>
      </div>
    </div>
  )
}
