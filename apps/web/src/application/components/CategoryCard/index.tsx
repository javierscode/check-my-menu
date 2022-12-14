import { Category } from '@domain/entities/category'
import Link from 'next/link'

import styles from './CategoryCard.module.css'

type Props = {
  category: Category
  currentSlug: string
}

export function CategoryCard({ category, currentSlug }: Props) {
  const customStyles = {
    '--image-url': `url(${category.image})`,
  } as React.CSSProperties

  return (
    <Link
      style={customStyles}
      className={styles.card}
      href={`/${currentSlug}/${category.restaurantId}`}
    >
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </Link>
  )
}
