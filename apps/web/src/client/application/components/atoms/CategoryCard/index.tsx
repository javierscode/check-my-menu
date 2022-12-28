import { Category } from '@shared/domain/entities/category'
import Link from 'next/link'

import styles from './CategoryCard.module.css'

export type CategoryCardProps = {
  category: Category
  href: string
}

export function CategoryCard({ category, href }: CategoryCardProps) {
  const customStyles = {
    '--image-url': `url(${category.image})`,
  } as React.CSSProperties

  return (
    <Link href={href} legacyBehavior>
      <a style={customStyles} className={styles.card}>
        <h2>{category.name}</h2>
        <p>{category.description}</p>
      </a>
    </Link>
  )
}
