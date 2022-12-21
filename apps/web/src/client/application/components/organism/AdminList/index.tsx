import { AddIcon } from '@client/application/icons/AddIcon'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { Restaurant } from '@shared/domain/entities/restaurant'

import { AdminCard } from '../../molecules/AdminCard'
import styles from './AdminList.module.css'

type Item = Restaurant | Category | Dish

type Props = {
  title: string
  items: Item[]
  buttonTitle: string
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const checkLinkTo = (item: Item) => {
  const isRestaurant = Object.keys(item).includes('domain')
  const restaurant = item as Restaurant
  if (isRestaurant) {
    return `/admin/${restaurant.id}/categories`
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
          onEdit={() => onEdit(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
      <button className={styles.button} onClick={onAdd}>
        <AddIcon />
        {buttonTitle}
      </button>
    </div>
  )
}
