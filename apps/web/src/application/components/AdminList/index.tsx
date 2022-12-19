import { AddIcon } from '@application/icons/AddIcon'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { Restaurant } from '@domain/entities/restaurant'

import { AdminCard } from '../AdminCard'
import styles from './AdminList.module.css'

type Item = Restaurant | Category | Dish

type Props = {
  title: string
  items: Item[]
  buttonTitle: string
  onAdd: () => void
  onEdit: (item: Item) => void
  onDelete: (item: Item) => void
}

const checkLinkTo = (item: Item) => {
  const isRestaurant = Object.keys(item).includes('domain')
  const restaurant = item as Restaurant
  if (isRestaurant) {
    return `/admin/${restaurant.domain}/categories`
  }
}

export function AdminList({ title, items, buttonTitle, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {items.map(item => (
        <AdminCard
          key={item.id}
          linkTo={checkLinkTo(item)}
          title={item.name}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
      <button className={styles.button} onClick={onAdd}>
        <AddIcon />
        {buttonTitle}
      </button>
    </div>
  )
}
