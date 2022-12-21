import { Category } from '@shared/domain/entities/category'
import Link from 'next/link'

import styles from './CategoryCard.module.css'

type Props = {
  category: Category
  href: string
}

export function CategoryCard({ category, href }: Props) {
  const customStyles = {
    '--image-url': `url(${category.image})`,
  } as React.CSSProperties

  return (
    <Link style={customStyles} className={styles.card} href={href}>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </Link>
  )
}
